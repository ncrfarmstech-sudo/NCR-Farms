import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogBySlug } from "../api/blog";
import Breadcrumb from "../components/common/Breadcrumb";
import { FiArrowLeft } from "react-icons/fi";
import "../blog.css";

function processContent(html) {
  if (!html) return { processedHtml: html, headings: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const headings = [];
  let counter = 0;

  doc.querySelectorAll("h2, h3, h4").forEach((el) => {
    const text = el.textContent.replace(/^\d+(\.\d+)*\s*/, "").trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const id = `toc-${counter++}-${slug}`;
    el.id = id;

    headings.push({ id, text, tag: el.tagName.toLowerCase() });
  });

  return { processedHtml: doc.body.innerHTML, headings };
}

const indentClass = {
  h2: "pl-0",
  h3: "pl-0",
  h4: "pl-0",
};

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState("");
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

  // Set first heading as active initially
  useEffect(() => {
    if (headings.length > 0 && !activeId) {
      setActiveId(headings[0].id);
    }
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const els = document.querySelectorAll(
        ".blog-content h2, .blog-content h3, .blog-content h4"
      );
      let currentId = "";
      for (const el of els) {
        // Skip hidden elements (e.g. from the mobile/desktop duplicate layout)
        if (!el.id || el.offsetParent === null) continue;
        if (el.getBoundingClientRect().top <= 120) {
          currentId = el.id;
        }
      }
      // Default to first heading if none have scrolled past threshold
      if (!currentId && headings.length > 0) {
        currentId = headings[0].id;
      }
      setActiveId(currentId);
    };

    // Delay to let DOM render
    const timer = setTimeout(() => {
      handleScroll(); // set initial active
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings.length, processedHtml]);

  const scrollToHeading = (index) => {
    const els = Array.from(
      document.querySelectorAll(".blog-content h2, .blog-content h3, .blog-content h4")
    );
    const el = els[index];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (loading) return <div className="pt-20 px-4 text-center">Loading...</div>;

  if (error || !blog) {
    return (
      <div className="pt-20 px-4 text-center">
        <p className="text-red-500">{error || "Blog not found."}</p>
        <button onClick={() => navigate("/blog")} className="mt-4 underline">
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
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-sm text-[#234436] mb-6 hover:underline"
          >
            <FiArrowLeft /> Back to Blogs
          </button>

          {blog.imageUrls?.length > 0 && (
            <div className="w-full h-64 md:h-96 overflow-hidden rounded-xl mb-8">
              <img
                src={blog.imageUrls[0]}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-10">
            {/* TOC */}
            {headings.length > 0 && (
              <div className="lg:col-span-1">
                <div className="toc-container sticky top-20">  {/* ← adjusted for better vertical alignment */}
                  <div className="toc-card">
                    <h3 className="toc-title">Table of Contents</h3>

                    <ul className="toc-list space-y-2 mt-3">
                      {headings.map((h, idx) => {
                        const isActive = activeId === h.id;

                        return (
                          <li
                            key={h.id}
                            className={`toc-item ${indentClass[h.tag]} ${isActive ? "active" : ""}`}
                          >
                            <button
                              onClick={() => scrollToHeading(idx)}
                              className={`toc-link ${isActive ? "active" : ""}`}
                            >
                              {h.text}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className={headings.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
              <h1 className="text-4xl font-bold text-[#234436] mb-3">
                {blog.title}
              </h1>

              <p className="text-gray-500 mb-6">
                {blog.author} · {new Date(blog.createdAt).toLocaleDateString()}
              </p>

              <div className="blog-content">
                <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            <h1 className="text-2xl font-bold mb-3">{blog.title}</h1>
            <p className="text-gray-500 mb-6">
              {blog.author} · {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            {/* Collapsible TOC */}
            {headings.length > 0 && (
              <div className="toc-card mb-6">
                <button
                  onClick={() => setTocOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full"
                >
                  <h3 className="toc-title">Table of Contents</h3>
                  <span
                    className={`text-[#234436] text-xl font-bold transition-transform duration-300 ${
                      tocOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    tocOpen ? "max-h-[1000px] mt-3" : "max-h-0"
                  }`}
                >
                  <ul className="toc-list space-y-2">
                    {headings.map((h, idx) => {
                      const isActive = activeId === h.id;
                      return (
                        <li
                          key={h.id}
                          className={`toc-item ${indentClass[h.tag]} ${isActive ? "active" : ""}`}
                        >
                          <button
                            onClick={() => {
                              scrollToHeading(idx);
                              setTocOpen(false);
                            }}
                            className={`toc-link ${isActive ? "active" : ""}`}
                          >
                            {h.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            <div className="blog-content-mobile">
              <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;