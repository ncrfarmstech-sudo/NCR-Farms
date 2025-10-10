import axios from './axios';

export const fetchFeaturedProducts = async () => {
  const res = await axios.get('/featured-products');
  return res.data;
};

// Fetch a single featured property by ID
export const fetchFeaturedProductById = async (id) => {
  const res = await axios.get(`/featured-products/${id}`);
  return res.data;
};
