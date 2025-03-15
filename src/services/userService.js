import axios from 'axios';

const API_URL = "http://localhost:8080/api/users";

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