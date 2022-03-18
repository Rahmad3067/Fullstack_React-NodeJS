const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "public/image" });
const categoryController = require("../controller/categoryControler")
const router = express.Router();
const protect = require("../middleware/protect");
const { addCategory, uploadImage, categoryList, oneCategory } = require("../controller/categoryControler");



// adding a new category name
router.post("/category", addCategory);
// adding a new category picture and in folder public and upload
router.post("/category/upload", upload.single("image"), uploadImage);
// Getting list of all categories
router.get("/category/all", categoryList);
router.get("/category/one/oneCategory/:id", oneCategory)















module.exports = router;