import axios from '../api/axios';

export const fetchProperties = async () => {
  const res = await axios.get('/properties');
  return res.data;
};

// Fetch a single property by ID
export const fetchPropertyById = async (id) => {
  const res = await axios.get(`/properties/${id}`);
  return res.data;
};
