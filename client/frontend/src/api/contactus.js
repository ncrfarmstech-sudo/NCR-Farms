import axios from "./axios";

export const sendContactMessage = async (data) => {
  // POST to /api/contact (backend route)
  return axios.post("/contact", data);
};
