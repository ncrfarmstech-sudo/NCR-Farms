import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../api/blog";
import { stripHtml } from "../utils/stripHtml";

const BLOGS_PER_PAGE = 9;

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
  const [currentPage, setCurrentPage] = useState(1);
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

  const goTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const isFirstPage = currentPage === 1;
  const featured = isFirstPage && blogs.length > 0 ? blogs[0] : null;
  const twoColBlogs = isFirstPage ? blogs.slice(1, 3) : [];
  const gridBlogs = isFirstPage
    ? blogs.slice(3, BLOGS_PER_PAGE)
    : blogs.slice((currentPage - 1) * BLOGS_PER_PAGE, currentPage * BLOGS_PER_PAGE);
  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

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
              {/* Featured post — page 1 only */}
              {featured && (
                <FeaturedCard
                  blog={featured}
                  onClick={() => navigate(`/blog/${toBlogSlug(featured.title)}`)}
                />
              )}

              {/* 2-column row — blogs[1] & blogs[2], page 1 only */}
              {twoColBlogs.length > 0 && (
                <div className={`grid gap-7 mb-7 ${
                  twoColBlogs.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
                }`}>
                  {twoColBlogs.map((blog) => (
                    <BlogCard
                      key={blog._id}
                      blog={blog}
                      onClick={() => navigate(`/blog/${toBlogSlug(blog.title)}`)}
                    />
                  ))}
                </div>
              )}

              {/* 3-column grid — remaining blogs */}
              {gridBlogs.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {gridBlogs.map((blog, index) => (
                    <div
                      key={blog._id}
                      onClick={() => navigate(`/blog/${toBlogSlug(blog.title, blog._id)}`)}
                      className={gridBlogs.length % 3 === 1 && index === gridBlogs.length - 1
                        ? "sm:col-span-2 lg:col-span-3"
                        : gridBlogs.length % 3 === 2 && index === gridBlogs.length - 1
                        ? "lg:col-span-1"
                        : ""}
                    >
                      <BlogCard
                        blog={blog}
                        onClick={() => {}}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ── Pagination ── */}
              <div className="flex items-center justify-center gap-1.5 mt-14 flex-wrap">
                  <button
                    onClick={() => goTo(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goTo(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold border transition ${
                        page === currentPage
                          ? "bg-[#234436] text-white border-[#234436] shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => goTo(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
