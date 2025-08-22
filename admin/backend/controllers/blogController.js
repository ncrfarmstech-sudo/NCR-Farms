// Partial update blog (PATCH)
exports.partialUpdateBlog = async (req, res) => {
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
    const blog = await blogService.partialUpdateBlog(req.params.id, req.body, files);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const blogService = require("../services/blogService");

// Create blog
exports.createBlog = async (req, res) => {
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
      console.log('Creating blog with data:', req.body);
      console.log('Files received:', req.files);
      if (req.files) {
        Object.keys(req.files).forEach(key => {
          console.log(`req.files[${key}]:`, req.files[key]);
        });
      }
    const blog = await blogService.createBlog(req.body, files);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get blog by id
exports.getBlog = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
    const blog = await blogService.updateBlog(req.params.id, req.body, files);
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
