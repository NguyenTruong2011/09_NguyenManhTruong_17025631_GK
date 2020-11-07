const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const dynamoDB = require("./config/config.js");
var format = require('date-format');

const { json } = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set("view engine", "ejs");
app.set("views", "./view");

app.get("/", (req, res) => {
    let params = {
        TableName: "NguyenManhTruong",
    };
    dynamoDB.scan(params, (err, data) => {
        if (err) {
            console.error(JSON.stringify(err, null, 2));
        } else {
            res.render("index2", {
                dataSP: data.Items,
            });
        }
    });
});
//them 

app.post("/addsanpham", (req, res) => {
    const { masp, tensp, soluong } = req.body;

    let sanpham = {
        id: Math.ceil(Math.random() * 10000),
        masp: masp,
        tensp: tensp,
        soluong: soluong,
        
       
    };
    let params = {
        TableName: "NguyenManhTruong",
        Item: sanpham,
    };
    dynamoDB.put(params, (err, data) => {
        if (err) {
            console.error("Loi r: ", JSON.stringify(err, null, 2));
        }
        else {
            res.redirect("/");

            //res.json({ "msg:": "them thanh cong" });

        }
    });
});
//delete
app.post("/delete", (req, res) => {
    const { idsv } = req.body;
    try {
        let params = {
            TableName: "NguyenManhTruong",
            Key: {
                id: parseInt(idsv),
            },
        };
        dynamoDB.delete(params, (err, data) => {
            if (err) {
                console.error("ErrorL ", JSON.stringify(err, null, 2));
            } else {
                res.redirect("/");
            }
        });
    } catch (error) {
        res.status(500).send("server loi");
    }
});
// app.get("/get/:id", (req, res) => {
//     const { id } = req.params;

//     const params = {
//         TableName: "giuakine",
//         Key: {
//             id: Number(id),
//         },
//     };

//     dynamoDB.get(params, (err, data) => {
//         if (err) {
//             console.error(
//                 "Unable to read item. Error JSON:",
//                 JSON.stringify(err, null, 2)
//             );
//         } else {
//             //   console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//             res.json(data.Items);
//         }
//     });
// });

app.get("/addsp", (req, res) => {
    res.render('add2');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Start" + PORT));
