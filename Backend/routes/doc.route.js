const express = require("express");
const router = express.Router();
const upload = require("../configuration/upload.js");;
const { uploadDoc } = require("../controllers/doc.controller.js");
const docValidation=require("../middlewares/doc.middleware.js");

router.post("/upload", upload.single("file"),docValidation, uploadDoc);

module.exports = router;
