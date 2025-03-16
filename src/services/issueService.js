import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL+"/api/issues";

const reportIssue = async (issue) => {
  const response = await axios.post(`${API_URL}/report`, issue);
  return response.data;
};

const getIssues = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

const resolveIssue = async (issueId) => {
  const response = await axios.put(`${API_URL}/resolve/${issueId}`);
  return response.data;
};

export default {
  reportIssue,
  getIssues,
  resolveIssue
};
