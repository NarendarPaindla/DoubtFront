import React, { useState, useEffect } from 'react';
import appointmentService from '../../services/appointmentService';
import { Grid, Paper, Typography, Divider } from '@mui/material';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentService.getAppointmentsByStudent(user.id);
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };
    fetchAppointments();
  }, [user.id]);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {appointments.map((app) => (
        <Grid item xs={12} key={app.id}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Appointment ID: {app.id}</Typography>
            <Typography variant="body1">Trainer ID: {app.trainerId}</Typography>
            <Typography variant="body1">Time: {new Date(app.appointmentTime).toLocaleString()}</Typography>
            <Typography variant="body1">Status: {app.status}</Typography>
            <Divider sx={{ my: 1 }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyAppointments;
