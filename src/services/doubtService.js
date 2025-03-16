import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL+"/api/doubts";

const askDoubt = async (doubt) => {
  const response = await axios.post(`${API_URL}/ask`, doubt);
  return response.data;
};

const getAllDoubts = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

const replyToDoubt = async (doubtId, reply) => {
  const response = await axios.post(`${API_URL}/reply/${doubtId}`, reply);
  return response.data;
};

export default {
  askDoubt,
  getAllDoubts,
  replyToDoubt
};
