import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../api/blog";
import { stripHtml } from "../utils/stripHtml";
import Breadcrumb from "../components/common/Breadcrumb";
import "../blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all blogs
  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogs();
        setBlogs(data);
        setActiveBlog(data?.[0] || null); // default selected blog
        setError(null);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 px-4 md:px-10 text-center">
        <p className="text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 px-4 md:px-10 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-10">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto">
        
        {/* Page Heading */}
        <h1 className="text-4xl font-bold mb-8 text-[#234436]">Blog</h1>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

          {/* LEFT SIDE — Blog Titles */}
          <div className="border-r pr-4 h-[75vh] overflow-y-auto scrollbar-thin">
            <h2 className="text-2xl font-semibold text-[#234436] mb-4">
              All Blogs
            </h2>

            <div className="flex flex-col gap-3">
              {blogs.map((blog) => (
                <button
                  key={blog._id}
                  onClick={() => setActiveBlog(blog)}
                  className={`text-left p-3 rounded-lg border transition-all duration-200
                    ${
                      activeBlog?._id === blog._id
                        ? "bg-[#234436] text-white border-[#234436]"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <div className="font-semibold">{blog.title}</div>
                  {blog.createdAt && (
                    <div className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — Selected Blog Content */}
          <div className="md:col-span-2">
            {activeBlog ? (
              <>
                {/* Blog Image */}
                {activeBlog.imageUrls?.length > 0 && (
                  <img
                    src={activeBlog.imageUrls[0]}
                    alt={activeBlog.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}

                {/* Blog Title */}
                <h2 className="text-3xl font-bold text-[#234436] mb-3">
                  {activeBlog.title}
                </h2>

                {/* Meta Info */}
                <p className="text-gray-600 mb-4">
                  {activeBlog.author && (
                    <span className="font-semibold">{activeBlog.author}</span>
                  )}
                  {activeBlog.author && activeBlog.createdAt && " • "}
                  {activeBlog.createdAt && (
                    <span>{new Date(activeBlog.createdAt).toLocaleDateString()}</span>
                  )}
                </p>

                {/* Blog Content - Render HTML with styles */}
                <div className="blog-content text-gray-700 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: activeBlog.content }} />
                </div>
              </>
            ) : (
              <p className="text-gray-600">Select a blog to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
