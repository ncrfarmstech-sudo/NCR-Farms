import axios from './axios';

export const fetchFeaturedProducts = async () => {
  const res = await axios.get('/featured-products');
  return res.data;
};

export const createFeaturedProduct = async (formData) => {
  const res = await axios.post('/featured-products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateFeaturedProduct = async (id, formData) => {
  const res = await axios.put(`/featured-products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const patchFeaturedProduct = async (id, formData) => {
  const res = await axios.patch(`/featured-products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteFeaturedProduct = async (id) => {
  const res = await axios.delete(`/featured-products/${id}`);
  return res.data;
};
