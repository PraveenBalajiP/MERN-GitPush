import axios from 'axios';

const rawBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const normalizedBase = rawBase.replace(/^\/+|\/+$/g, '');
const API_BASE_URL = normalizedBase.startsWith('http')
  ? normalizedBase
  : `https://${normalizedBase}`;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
