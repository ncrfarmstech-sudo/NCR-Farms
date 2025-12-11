// PATCH: Partial update Blog
async function partialUpdateBlog(id, data, files) {
  const blog = await Blog.findById(id);
  if (!blog) return null;

  const updateData = {};

  if (typeof data.title !== 'undefined') {
    updateData.title = data.title;
  }
  if (typeof data.content !== 'undefined') {
    updateData.content = sanitizeHtml(data.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title', 'width', 'height', 'style', 'class'],
        figure: ['class', 'style'],
        figcaption: ['class', 'style']
      },
      allowedStyles: {
        '*': {
          'width': [/^\d+(?:px|em|%)$/],
          'height': [/^\d+(?:px|em|%)$/],
          'max-width': [/^\d+(?:px|em|%)$/],
        }
      }
    });
  }

  // Handle existing image URLs from frontend
  let existingImageUrls = [];
  if (data.existingImageUrls) {
    if (Array.isArray(data.existingImageUrls)) {
      existingImageUrls = data.existingImageUrls;
    } else if (typeof data.existingImageUrls === 'string') {
      existingImageUrls = [data.existingImageUrls];
    }
  }

  let newImageUrls = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const uploadRes = await uploadToCloudinary(file);
      newImageUrls.push(uploadRes.secure_url);
    }
  }
  // Merge existing and new
  updateData.imageUrls = [...existingImageUrls, ...newImageUrls];
  
  return await Blog.findByIdAndUpdate(id, updateData, { new: true });
}


const Blog = require("../models/Blog");
const sanitizeHtml = require("sanitize-html");
const cloudinary = require("../config/cloudinary");

async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "blogs" }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(file.buffer);
  });
}

// Create Blog
async function createBlog(data, files) {
  const sanitizedContent = sanitizeHtml(data.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt']
    }
  });

  let imageUrls = [];
  if (files && files.length > 0) {
    console.log('Files received in service:', files);
    for (const file of files) {
      try {
        const uploadRes = await uploadToCloudinary(file);
        console.log('Cloudinary upload result:', uploadRes);
        imageUrls.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary upload error:', err);
      }
    }
  }

  const blog = new Blog({
    title: data.title,
    content: sanitizedContent,
    author: data.author,
    imageUrls
  });
  return await blog.save();
}

// Get all Blogs
async function getAllBlogs() {
  return await Blog.find().sort({ createdAt: -1 });
}

// Get single Blog
async function getBlogById(id) {
  return await Blog.findById(id);
}

// Update Blog
async function updateBlog(id, data, files) {
  const sanitizedContent = sanitizeHtml(data.content || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'style', 'class'],
      figure: ['class', 'style'],
      figcaption: ['class', 'style']
    },
    allowedStyles: {
      '*': {
        'width': [/^\d+(?:px|em|%)$/],
        'height': [/^\d+(?:px|em|%)$/],
        'max-width': [/^\d+(?:px|em|%)$/],
      }
    }
  });
  const blog = await Blog.findById(id);
  if (!blog) return null;

  blog.title = data.title;
  blog.content = sanitizedContent;

  // Handle existing image URLs from frontend
  let existingImageUrls = [];
  if (data.existingImageUrls) {
    if (Array.isArray(data.existingImageUrls)) {
      existingImageUrls = data.existingImageUrls;
    } else if (typeof data.existingImageUrls === 'string') {
      existingImageUrls = [data.existingImageUrls];
    }
  }

  let newImageUrls = [];
  if (files && files.length > 0) {
    console.log('Files received in partial update:', files);
    for (const file of files) {
      try {
        const uploadRes = await uploadToCloudinary(file);
        console.log('Cloudinary upload result:', uploadRes);
        newImageUrls.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary upload error:', err);
      }
    }
  }
  // Merge existing and new
  blog.imageUrls = [...existingImageUrls, ...newImageUrls];
  return await blog.save();
}

// Delete Blog
async function deleteBlog(id) {
  return await Blog.findByIdAndDelete(id);
}

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, partialUpdateBlog, deleteBlog };
