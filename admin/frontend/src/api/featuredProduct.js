import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchFeaturedProducts = async () => {
  const res = await axios.get(`${API_URL}/featured-products`);
  return res.data;
};

export const createFeaturedProduct = async (data) => {
  const res = await axios.post(`${API_URL}/featured-products`, data);
  return res.data;
};

export const updateFeaturedProduct = async (id, data) => {
  const res = await axios.put(`${API_URL}/featured-products/${id}`, data);
  return res.data;
};

export const deleteFeaturedProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/featured-products/${id}`);
  return res.data;
};
