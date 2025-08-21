import axios from './axios';

export const fetchBlogs = async () => {
  const res = await axios.get('/blogs');
  return res.data;
};

export const createBlog = async (blogData) => {
  const res = await axios.post('/blogs', blogData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateBlog = async (id, blogData) => {
  const res = await axios.patch(`/blogs/${id}`, blogData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await axios.delete(`/blogs/${id}`);
  return res.data;
};
