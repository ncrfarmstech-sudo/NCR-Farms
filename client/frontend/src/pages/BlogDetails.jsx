import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogBySlug } from "../api/blog";
import Breadcrumb from "../components/common/Breadcrumb";
import { FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";
import "../blog.css";

function processContent(html) {
  if (!html) return { processedHtml: html, headings: [] };
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = [];
  let counter = 0;
  doc.querySelectorAll("h2, h3, h4").forEach((el) => {
    const text = el.textContent.replace(/^\d+(\.\d+)*\s*/, "").trim();
    const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const id = `toc-${counter++}-${slug}`;
    el.id = id;
    headings.push({ id, text, tag: el.tagName.toLowerCase() });
  });
  return { processedHtml: doc.body.innerHTML, headings };
}

const indentClass = { h2: "pl-0", h3: "pl-4", h4: "pl-8" };

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogBySlug(slug);
        setBlog(data);
        setError(null);
      } catch {
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [slug]);

  const { processedHtml, headings } = useMemo(
    () => processContent(blog?.content || ""),
    [blog]
  );

  const scrollToHeading = (index) => {
    // Query only visible blog-content headings (one layout hidden on each breakpoint)
    const els = Array.from(
      document.querySelectorAll(".blog-content h2, .blog-content h3, .blog-content h4")
    ).filter((el) => el.offsetParent !== null);
    const el = els[index];
    if (el) {
      const offset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="pt-20 px-4 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="pt-20 px-4 text-center">
        <p className="text-red-600">{error || "Blog not found."}</p>
        <button onClick={() => navigate("/blog")} className="mt-4 text-[#234436] underline text-sm">
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="pt-24 px-4 md:px-10 pb-16">
        <Breadcrumb />
        <div className="max-w-7xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-sm text-[#234436] font-medium mb-6 hover:underline"
          >
            <FiArrowLeft size={16} /> Back to Blogs
          </button>

          {/* ── Full-width Hero Image ── */}
          {blog.imageUrls?.length > 0 && (
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-2xl mb-8">
              <img
                src={blog.imageUrls[0]}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

        {/* ── MOBILE layout ── */}
        <div className="block lg:hidden">
          <h1 className="text-2xl font-bold text-[#234436] mb-2 leading-snug">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-5">
            {blog.author && <span className="font-semibold text-gray-600">{blog.author}</span>}
            {blog.author && blog.createdAt && " · "}
            {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>}
          </p>

          {/* Collapsible TOC */}
          {headings.length > 0 && (
            <div className="mb-5 rounded-lg border border-[#234436] overflow-hidden">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#234436] text-white text-xs font-bold uppercase tracking-widest"
              >
                <span>Table of Contents</span>
                {tocOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
              </button>
              {tocOpen && (
                <ul className="toc-list px-3 py-2 space-y-1 bg-[#f4f9f6]">
                  {headings.map((h, idx) => (
                    <li key={h.id} className={indentClass[h.tag]}>
                      <button
                        onClick={() => { scrollToHeading(idx); setTocOpen(false); }}
                        className="text-left text-xs text-[#234436] hover:underline w-full flex items-start gap-1"
                      >
                        <span className="mt-0.5 text-[#234436] opacity-60">›</span>{h.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="blog-content text-gray-700 leading-relaxed text-[15px]">
            <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
          </div>
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-10 items-start">

          {/* Blog Content — left 2/3 */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-[#234436] mb-3 leading-tight">{blog.title}</h1>
            <p className="text-gray-600 mb-6">
              {blog.author && <span className="font-semibold">{blog.author}</span>}
              {blog.author && blog.createdAt && " · "}
              {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>}
            </p>
            <div className="blog-content text-gray-700 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
            </div>
          </div>

          {/* TOC — sticky right 1/3 */}
          {headings.length > 0 && (
            <div className="sticky top-24 self-start">
              <div className="border border-[#234436] rounded-xl bg-[#f4f9f6] shadow-md overflow-hidden">
                <div className="px-3 py-2 bg-[#234436]">
                  <p className="text-[11px] font-bold text-white uppercase tracking-widest">Table of Contents</p>
                </div>
                <ul className="toc-list px-3 py-2 space-y-0.5 overflow-y-auto max-h-[60vh]">
                  {headings.map((h, idx) => (
                    <li key={h.id} className={indentClass[h.tag]}>
                      <button
                        onClick={() => scrollToHeading(idx)}
                        className="text-left text-xs text-[#234436] hover:underline hover:text-[#3a6b52] transition-colors duration-150 w-full flex items-start gap-1 py-0.5"
                      >
                        <span className="mt-0.5 opacity-60">›</span>{h.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
