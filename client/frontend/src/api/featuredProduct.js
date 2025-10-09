import axios from './axios';

export const fetchFeaturedProducts = async () => {
  const res = await axios.get('/featured-products');
  return res.data;
};
