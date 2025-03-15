import React, { useEffect, useState } from 'react';
import appointmentService from '../../services/appointmentService';
import { Grid, Paper, Typography, Box, Button, Divider } from '@mui/material';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentService.getAppointmentsByTrainer(user.id);
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };
    fetchAppointments();
  }, [user.id]);

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await appointmentService.updateAppointmentStatus(appointmentId, status);
      alert("Appointment updated");
      window.location.reload();
    } catch (error) {
      console.error("Error updating appointment", error);
    }
  };

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {appointments.map(app => (
         <Grid item xs={12} key={app.id}>
           <Paper elevation={3} sx={{ p: 3 }}>
             <Typography variant="h6">Appointment ID: {app.id}</Typography>
             <Typography variant="body1">
               Student Name: {app.studentName || app.studentId}
             </Typography>
             <Typography variant="body1">
               Time: {new Date(app.appointmentTime).toLocaleString()}
             </Typography>
             <Typography variant="body1">Status: {app.status}</Typography>
             <Divider sx={{ my: 2 }} />
             <Box>
               <Button variant="contained" color="success" sx={{ mr: 1 }} onClick={() => handleStatusChange(app.id, "ACCEPTED")}>
                 Accept
               </Button>
               <Button variant="contained" color="error" sx={{ mr: 1 }} onClick={() => handleStatusChange(app.id, "REJECTED")}>
                 Reject
               </Button>
               <Button variant="contained" color="warning" onClick={() => handleStatusChange(app.id, "RESCHEDULED")}>
                 Reschedule
               </Button>
             </Box>
           </Paper>
         </Grid>
      ))}
    </Grid>
  );
};

export default ViewAppointments;
