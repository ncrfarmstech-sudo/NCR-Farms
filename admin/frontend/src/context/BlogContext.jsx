import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../api/blog';

const BlogContext = createContext();

export const useBlogs = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blogs');
    }
    setLoading(false);
  };

  const addBlog = async (formData) => {
    await createBlog(formData);
    await loadBlogs();
  };

  const editBlog = async (id, formData) => {
    await updateBlog(id, formData);
    await loadBlogs();
  };

  const removeBlog = async (id) => {
    await deleteBlog(id);
    await loadBlogs();
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, loading, error, addBlog, editBlog, removeBlog, loadBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};
