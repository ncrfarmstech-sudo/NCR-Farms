import React, { useEffect, useState } from "react";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "../api/blog";
import BlogForm from "../components/blog/BlogForm";
import Modal from "../components/blog/Modal";
import { stripHtml } from "../utils/stripHtml";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from 'react-toastify';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBlogs = async () => {
    setLoading(true);
    try {
  const data = await fetchBlogs(); // Fetch blogs from API
      setBlogs(data);
    } catch {
      setError("Failed to load blogs");
      toast.error("Failed to load blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editBlog) {
  await updateBlog(editBlog._id, formData); // Update existing blog
        toast.success("Blog updated successfully!");
      } else {
  await createBlog(formData); // Create new blog
        toast.success("Blog created successfully!");
      }
      setEditBlog(null);
      await loadBlogs();
    } catch {
      setError("Failed to save blog.");
      toast.error("Failed to save blog.");
    }
    setLoading(false);
  };

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setLoading(true);
    try {
  await deleteBlog(id); // Delete blog by ID
      toast.success("Blog deleted successfully!");
      loadBlogs();
    } catch {
      setError("Failed to delete blog");
      toast.error("Failed to delete blog");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditBlog(null);
    setModalOpen(false);
  };

  return (
    <div className="p-8 min-h-screen ml-56 bg-gradient-to-br from-blue-50 to-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
          Manage Blogs
        </h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
          onClick={() => {
            setEditBlog(null);
            setModalOpen(true);
          }}
        >
          <Plus className="w-5 h-5" /> Add Blog
        </button>
      </div>

      {error && <div className="text-red-500 mb-3">{error}</div>}
      {loading && <div className="text-gray-500 mb-3">Loading...</div>}

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-3 hover:shadow-2xl transition"
          >
            {Array.isArray(blog.imageUrls) && blog.imageUrls.length > 0 && (
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {blog.imageUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={blog.title + ' image ' + (idx + 1)}
                    className="w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-sm"
                  />
                ))}
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {blog.title}
            </h3>
            <p className="text-gray-600 text-sm flex-1 mb-4">
              {typeof blog.content === "string"
                ? stripHtml(blog.content).substring(0, 120) + "..."
                : ""}
            </p>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 text-sm"
                onClick={() => handleEdit(blog)}
              >
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 text-sm"
                onClick={() => handleDelete(blog._id)}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={handleCancel}>
        <BlogForm
          initial={editBlog || {}}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
        {editBlog ? (
          <div className="text-sm text-gray-500 mt-2">
            Editing blog: <b>{editBlog.title}</b>
          </div>
        ) : (
          <div className="text-sm text-gray-500 mt-2">
            Create a new blog post
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Blog;
