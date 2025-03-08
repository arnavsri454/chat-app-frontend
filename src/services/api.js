import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Ensure this is set correctly
  headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON headers
});

export const loginUser = async (email, password) => {
  return api.post('/api/auth/login', { email, password });
};
export const registerUser = async (username, email, password) => {
  return api.post('/api/auth/register', { username, email, password }); // ✅ FIXED
};

export default api;
