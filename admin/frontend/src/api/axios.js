import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  // You can add headers or interceptors here
});

export default instance;
