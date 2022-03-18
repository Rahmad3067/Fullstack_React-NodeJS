const express = require("express");
const multer = require("multer");
const router = express.Router();
//const protect = require("../middleware/protect");

const { createComment, deleteComment, modifyComment, getAllComment } = require("../controller/commentController");

router.post("/comment", createComment);
router.delete("/comment/:author", deleteComment);
router.put("/comment/:id", modifyComment);
router.get("/comment/article/:id", getAllComment)

module.exports = router;