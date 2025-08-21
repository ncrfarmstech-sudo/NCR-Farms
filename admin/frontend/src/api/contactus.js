import axios from './axios';

export const fetchContacts = async () => {
  const res = await axios.get('/contactus');
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await axios.delete(`/contactus/${id}`);
  return res.data;
};
