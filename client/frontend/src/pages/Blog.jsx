import React, { useState, useEffect, useMemo } from "react";
import { fetchBlogs } from "../api/blog";
import { stripHtml } from "../utils/stripHtml";
import Breadcrumb from "../components/common/Breadcrumb";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../blog.css";

// Parses HTML, injects unique IDs into H2/H3/H4, returns processed HTML + TOC entries
function processContent(html) {
  if (!html) return { processedHtml: html, headings: [] };
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = [];
  let counter = 0;
  doc.querySelectorAll("h2, h3, h4").forEach((el) => {
    const text = el.textContent.trim();
    const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const id = `toc-${counter++}-${slug}`;
    el.id = id;
    headings.push({ id, text, tag: el.tagName.toLowerCase() });
  });
  return { processedHtml: doc.body.innerHTML, headings };
}

const indentClass = { h2: "pl-0", h3: "pl-4", h4: "pl-8" };

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tocOpen, setTocOpen] = useState(false);

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

  const { processedHtml, headings } = useMemo(
    () => processContent(activeBlog?.content || ""),
    [activeBlog]
  );

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        <h1 className="text-4xl font-bold mb-6 text-[#234436]">Blog</h1>

        {/* ── MOBILE: horizontal scrollable blog tabs ── */}
        <div className="flex md:hidden gap-3 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {blogs.map((blog) => (
            <button
              key={blog._id}
              onClick={() => { setActiveBlog(blog); setTocOpen(false); }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                ${activeBlog?._id === blog._id
                  ? "bg-[#234436] text-white border-[#234436]"
                  : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              {blog.title.length > 30 ? blog.title.slice(0, 30) + "…" : blog.title}
            </button>
          ))}
        </div>

        {/* ── MOBILE: selected blog content ── */}
        <div className="block md:hidden">
          {activeBlog ? (
            <div>
              {/* Blog Image */}
              {activeBlog.imageUrls?.length > 0 && (
                <img
                  src={activeBlog.imageUrls[0]}
                  alt={activeBlog.title}
                  className="w-full h-52 object-cover rounded-2xl mb-5 shadow"
                />
              )}

              {/* Blog Title */}
              <h2 className="text-2xl font-bold text-[#234436] mb-2 leading-snug">
                {activeBlog.title}
              </h2>

              {/* Meta */}
              <p className="text-sm text-gray-500 mb-5">
                {activeBlog.author && <span className="font-semibold text-gray-600">{activeBlog.author}</span>}
                {activeBlog.author && activeBlog.createdAt && " · "}
                {activeBlog.createdAt && <span>{new Date(activeBlog.createdAt).toLocaleDateString()}</span>}
              </p>

              {/* Collapsible TOC on mobile */}
              {headings.length > 0 && (
                <div className="mb-6 rounded-xl border border-[#234436] overflow-hidden shadow-sm">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#234436] text-white text-sm font-bold uppercase tracking-widest"
                  >
                    <span>Table of Contents</span>
                    {tocOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                  </button>
                  {tocOpen && (
                    <ol className="list-none p-4 space-y-2 bg-[#f4f9f6]">
                      {headings.map((h, idx) => (
                        <li key={h.id} className={indentClass[h.tag]}>
                          <button
                            onClick={() => { scrollToHeading(h.id); setTocOpen(false); }}
                            className="text-left text-sm text-[#234436] hover:underline w-full"
                          >
                            <span className="font-semibold mr-1">{idx + 1}.</span>{h.text}
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}

              {/* Blog Content */}
              <div className="blog-content text-gray-700 leading-relaxed text-[15px]">
                <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">Select a blog to read.</p>
          )}
        </div>

        {/* ── DESKTOP: original 3-column layout ── */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

          {/* LEFT — Blog Titles */}
          <div className="border-r pr-4 h-[75vh] overflow-y-auto scrollbar-thin">
            <h2 className="text-2xl font-semibold text-[#234436] mb-4">All Blogs</h2>
            <div className="flex flex-col gap-3">
              {blogs.map((blog) => (
                <button
                  key={blog._id}
                  onClick={() => setActiveBlog(blog)}
                  className={`text-left p-3 rounded-lg border transition-all duration-200
                    ${activeBlog?._id === blog._id
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

          {/* RIGHT — Selected Blog Content */}
          <div className="md:col-span-2">
            {activeBlog ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Blog Content */}
                <div className="lg:col-span-2">
                  {activeBlog.imageUrls?.length > 0 && (
                    <img
                      src={activeBlog.imageUrls[0]}
                      alt={activeBlog.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}
                  <h2 className="text-3xl font-bold text-[#234436] mb-3">{activeBlog.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {activeBlog.author && <span className="font-semibold">{activeBlog.author}</span>}
                    {activeBlog.author && activeBlog.createdAt && " • "}
                    {activeBlog.createdAt && <span>{new Date(activeBlog.createdAt).toLocaleDateString()}</span>}
                  </p>
                  <div className="blog-content text-gray-700 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
                  </div>
                </div>

                {/* TOC */}
                {headings.length > 0 && (
                  <div className="block lg:sticky lg:top-24 lg:self-start order-first lg:order-none mb-4 lg:mb-0">
                    <div className="border border-[#234436] rounded-xl bg-[#f4f9f6] shadow-md overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#234436] bg-[#234436]">
                        <p className="text-xs font-bold text-white uppercase tracking-widest">Table of Contents</p>
                      </div>
                      <ol className="list-none p-4 space-y-1 overflow-y-auto max-h-[60vh]">
                        {headings.map((h, idx) => (
                          <li key={h.id} className={indentClass[h.tag]}>
                            <button
                              onClick={() => scrollToHeading(h.id)}
                              className="text-left text-sm text-[#234436] hover:underline hover:text-[#3a6b52] transition-colors duration-150 w-full"
                            >
                              <span className="font-semibold mr-1">{idx + 1}.</span>{h.text}
                            </button>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
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
