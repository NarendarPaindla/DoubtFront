import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL+"/api/appointments";

const bookAppointment = async (appointment) => {
  const response = await axios.post(`${API_URL}/book`, appointment);
  return response.data;
};

const getAppointmentsByTrainer = async (trainerId) => {
  const response = await axios.get(`${API_URL}/trainer/${trainerId}`);
  return response.data;
};

const getAppointmentsByStudent = async (studentId) => {
  const response = await axios.get(`${API_URL}/student/${studentId}`);
  return response.data;
};

const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await axios.put(`${API_URL}/update/${appointmentId}?status=${status}`);
  return response.data;
};

export default {
  bookAppointment,
  getAppointmentsByTrainer,
  getAppointmentsByStudent,
  updateAppointmentStatus
};
