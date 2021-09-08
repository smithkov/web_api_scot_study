const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
var path = require("path");

aws.config.update({
  secretAccessKey: process.env.S3SECRETKEY,
  accessKeyId: process.env.S3ACCESSKEY,
  region: "eu-west-2",
});
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG and PNG"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "scotsudy",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "scotstudy_img" });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});
module.exports = {
  upload: upload,
};
