import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser = async (username, email, password) => {
  return api.post('/api/auth/register', { username, email, password });
};

export default api;
