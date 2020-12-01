const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const keys = require("../config/keys");

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    signatureVersion: 'v4',   
    region: 'ap-south-1',
});

module.exports = (app) => {
    app.get("/api/upload", (req, res) => {
        const key = `images/some-user-id/${uuid()}.png`;

        s3.getSignedUrl('putObject', {
           Bucket: "advanced-node-tuts" ,
           ContentType: 'image/png',
           Expires: 60,
           Key: key,
        }, (err, url) => {
            res.send({ key, url });
        })
    });
};