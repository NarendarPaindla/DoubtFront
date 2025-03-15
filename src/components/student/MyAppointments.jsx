import React, { useEffect, useState } from 'react';
import appointmentService from '../../services/appointmentService';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Tabs, Tab, Box, 
  FormControl, InputLabel, Select, MenuItem, Typography 
} from '@mui/material';

const statusOptions = ["ALL", "ACCEPTED", "REJECTED", "RESCHEDULED", "DONE"];

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [tabIndex, setTabIndex] = useState(0);
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

  // Update the filter when the tab is changed
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setStatusFilter(statusOptions[newValue]);
  };

  // Synchronize dropdown selection with the tabs
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setStatusFilter(value);
    setTabIndex(statusOptions.indexOf(value));
  };

  // Filter appointments based on the selected status
  const filteredAppointments = statusFilter === "ALL" 
    ? appointments 
    : appointments.filter(app => app.status.toUpperCase() === statusFilter);

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        My Appointments
      </Typography>
      
      {/* Tabs & Dropdown for filtering */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Tabs 
          value={tabIndex} 
          onChange={handleTabChange} 
          textColor="primary" 
          indicatorColor="primary"
          sx={{ flexGrow: 1 }}
        >
          {statusOptions.map((status) => (
            <Tab key={status} label={status} />
          ))}
        </Tabs>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="status-filter-label">Filter</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Filter"
            onChange={handleFilterChange}
          >
            {statusOptions.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Appointment Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Appointment ID</TableCell>
              <TableCell>Trainer Name</TableCell>
              <TableCell>Appointment Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(app => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.trainerName || app.trainerId}</TableCell>
                  <TableCell>{new Date(app.appointmentTime).toLocaleString()}</TableCell>
                  <TableCell>{app.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MyAppointments;
