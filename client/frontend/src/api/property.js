import axios from '../api/axios';

export const fetchProperties = async () => {
  const res = await axios.get('/properties');
  return res.data;
};
