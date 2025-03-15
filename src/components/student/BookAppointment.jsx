import React, { useState, useEffect } from 'react';
import appointmentService from '../../services/appointmentService';
import userService from '../../services/userService';
import { Box, Button, TextField, Typography, Paper, Grid, MenuItem } from '@mui/material';

const BookAppointment = () => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await userService.getAllTrainers();
        setTrainers(data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };
    fetchTrainers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrainer || !appointmentTime) {
      alert("Please select a trainer and pick a time.");
      return;
    }
    try {
      const appointment = {
        studentId: user.id,
        trainerId: selectedTrainer,
        appointmentTime
      };
      await appointmentService.bookAppointment(appointment);
      alert("Appointment booked successfully");
      setSelectedTrainer('');
      setAppointmentTime('');
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={4} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Book Appointment
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              select
              label="Select Trainer"
              fullWidth
              required
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              margin="normal"
            >
              {trainers.map((trainer) => (
                <MenuItem key={trainer.id} value={trainer.id}>
                  {trainer.username}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Appointment Time"
              type="datetime-local"
              fullWidth
              required
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Book Appointment
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BookAppointment;
