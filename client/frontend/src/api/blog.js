import axios from './axios';

export const fetchBlogs = async () => {
  const res = await axios.get('/blogs');
  return res.data;
};

export const fetchBlogById = async (id) => {
  const res = await axios.get(`/blogs/${id}`);
  return res.data;
};

export const fetchBlogBySlug = async (slug) => {
  const res = await axios.get(`/blogs/slug/${slug}`);
  return res.data;
};
