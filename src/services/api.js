import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://chat-app-backend-ws6b.onrender.com"; // ✅ Fallback if .env is missing

const api = axios.create({
  baseURL: API_URL, 
  headers: { "Content-Type": "application/json" },
});

export const loginUser = async (email, password) => {
  return api.post('/api/auth/login', { email, password });
};

export const registerUser = async (username, email, password) => {
  return api.post('/api/auth/register', { username, email, password });
};

export default api;
