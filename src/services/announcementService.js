import axios from 'axios';

const API_URL = "http://localhost:8080/api/announcements";

const postAnnouncement = async (announcement) => {
  const response = await axios.post(`${API_URL}/post`, announcement);
  return response.data;
};

const getAnnouncements = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

export default {
  postAnnouncement,
  getAnnouncements
};
