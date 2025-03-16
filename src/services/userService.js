import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL+"/api/users";

const getAllTrainers = async () => {
  const response = await axios.get(`${API_URL}/trainers`);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export default {
  getAllTrainers,
  getUserById
};