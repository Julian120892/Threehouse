const fs = require("fs");
const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "julianbucketthreehouse",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("amazon upload complete");
            next();
            fs.unlink(path, () => {});
        })
        .catch((err) => {
            console.log("something went wrong uploading to S3", err);
            res.sendStatus(500);
        });
};

module.exports.delete = (req, res, next) => {
    const imgAdress = req.body.params.url;
    const file = imgAdress.substring(imgAdress.length - 36, imgAdress.length);
    console.log(imgAdress);
    console.log(file);
    const delObj = s3
        .deleteObject({
            Bucket: "julianbucketthreehouse",
            Key: file,
        })
        .promise();
    delObj
        .then(() => {
            console.log("Product deleted");
            next();
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};
