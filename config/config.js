const aws = require("aws-sdk");

const dynamoDB = new aws.DynamoDB.DocumentClient({
    region: "ap-southeast-1",
    accessKeyId: "",
    secretAccessKey: "",
});
module.exports = dynamoDB;