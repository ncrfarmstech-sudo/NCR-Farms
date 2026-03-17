import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../api/blog";
import { stripHtml } from "../utils/stripHtml";

const toBlogSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const readTime = (content) => {
  const words = stripHtml(content || "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

/* ── Small card (used in 3-col grid) ── */
const BlogCard = ({ blog, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
  >
    <div className="overflow-hidden">
      {blog.imageUrls?.length > 0 ? (
        <img
          src={blog.imageUrls[0]}
          alt={blog.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-52 bg-[#e6f0eb] flex items-center justify-center">
          <span className="text-[#234436] text-5xl font-black opacity-10">NCR</span>
        </div>
      )}
    </div>

    <div className="p-5 flex flex-col flex-1">
      <span className="inline-block text-xs font-semibold text-[#234436] bg-[#e6f0eb] px-3 py-1 rounded-full mb-3 w-fit">
        NCR Farms
      </span>
      <h2 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug line-clamp-2 group-hover:text-[#234436] transition-colors duration-200">
        {blog.title}
      </h2>
      <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1 leading-relaxed">
        {stripHtml(blog.content).slice(0, 140)}...
      </p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 text-xs text-gray-400">
        <div className="flex items-center gap-1 flex-wrap">
          {blog.author && (
            <span className="font-medium text-gray-600">{blog.author}</span>
          )}
          {blog.author && blog.createdAt && <span>·</span>}
          {blog.createdAt && <span>{formatDate(blog.createdAt)}</span>}
        </div>
        <span>{readTime(blog.content)} min read</span>
      </div>
    </div>
  </div>
);

/* ── Featured hero card (first post, page 1 only) ── */
const FeaturedCard = ({ blog, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl transition-all duration-300 mb-7 flex flex-col md:flex-row"
  >
    <div className="md:w-3/5 overflow-hidden">
      {blog.imageUrls?.length > 0 ? (
        <img
          src={blog.imageUrls[0]}
          alt={blog.title}
          className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-64 md:h-full bg-[#e6f0eb] flex items-center justify-center">
          <span className="text-[#234436] text-7xl font-black opacity-10">NCR</span>
        </div>
      )}
    </div>

    <div className="md:w-2/5 p-7 flex flex-col justify-center">
      <span className="inline-block text-xs font-semibold text-[#234436] bg-[#e6f0eb] px-3 py-1 rounded-full mb-4 w-fit">
        Featured · NCR Farms
      </span>
      <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#234436] transition-colors duration-200">
        {blog.title}
      </h2>
      <p className="text-sm text-gray-500 mb-6 line-clamp-4 leading-relaxed">
        {stripHtml(blog.content).slice(0, 220)}...
      </p>
      <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
        {blog.author && (
          <span className="font-medium text-gray-600">{blog.author}</span>
        )}
        {blog.author && blog.createdAt && <span>·</span>}
        {blog.createdAt && <span>{formatDate(blog.createdAt)}</span>}
        <span className="ml-auto">{readTime(blog.content)} min read</span>
      </div>
    </div>
  </div>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogs();
        setBlogs(data);
        setError(null);
      } catch {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#234436] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading blogs…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const isOdd = blogs.length % 2 !== 0;
  const topBlog = isOdd ? blogs[0] : null;
  const gridBlogs = isOdd ? blogs.slice(1) : blogs;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-10 md:px-32">
        {/* ── Header Banner ── */}
        <div className="bg-[#f4f9f6] rounded-2xl mt-28 mb-10 px-8 py-12">
          <p className="text-xs font-semibold text-[#234436] uppercase tracking-widest mb-2">
            NCR Farms Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Insights & Stories
          </h1>
          <p className="text-gray-500 text-base max-w-xl">
            Guides, updates and stories straight from the farm — land investment, agriculture, and beyond.
          </p>
        </div>

        {/* ── Content ── */}
        <div className="pb-16">
          {blogs.length === 0 ? (
            <p className="text-gray-400 text-center mt-24 text-lg">No blogs published yet.</p>
          ) : (
<>
              {/* Full-width top card — only when odd count */}
              {topBlog && (
                <FeaturedCard
                  blog={topBlog}
                  onClick={() => navigate(`/blog/${toBlogSlug(topBlog.title)}`)}
                />
              )}

              {/* 2-column grid */}
              {gridBlogs.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  {gridBlogs.map((blog) => (
                    <BlogCard
                      key={blog._id}
                      blog={blog}
                      onClick={() => navigate(`/blog/${toBlogSlug(blog.title)}`)}
                    />
                  ))}
                </div>
              )}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
