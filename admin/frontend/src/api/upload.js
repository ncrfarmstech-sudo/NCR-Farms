import axios from 'axios';

export const uploadImages = async (files) => {
  const formData = new FormData();
  for (let file of files) {
    formData.append('images', file);
  }
  const res = await axios.post('/api/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.urls;
};
