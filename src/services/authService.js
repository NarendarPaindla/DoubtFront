import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL+"/api/auth";

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(`${API_URL}/register`, user);
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
  return response.data;
};

export default {
  login,
  register,
  forgotPassword,
  resetPassword
};
