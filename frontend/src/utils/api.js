import axios from 'axios';
import { BASE_URL } from './config';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add token to headers for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;