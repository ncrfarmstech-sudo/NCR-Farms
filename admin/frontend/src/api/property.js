import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL || ''}/properties`;

export const fetchProperties = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createProperty = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const deleteProperty = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};


export const updateProperty = async (id, formData) => {
  // For backward compatibility, keep PUT
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const patchProperty = async (id, formData) => {
  // Use PATCH for partial update (edit)
  const res = await axios.patch(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
