const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { createBlog, getBlogs, getBlog, updateBlog, partialUpdateBlog, deleteBlog } = require("../controllers/blogController");

router.post("/", upload.fields([
 { name: "images", maxCount: 10 }
]), createBlog);

router.get("/", getBlogs);
router.get("/:id", getBlog);


router.put("/:id", upload.fields([
 { name: "images", maxCount: 10 }
]), updateBlog);

router.patch("/:id", upload.fields([
 { name: "images", maxCount: 10 }
]), partialUpdateBlog);

router.delete("/:id", deleteBlog);

module.exports = router;
