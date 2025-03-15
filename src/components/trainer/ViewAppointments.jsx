import React, { useEffect, useState } from 'react';
import appointmentService from '../../services/appointmentService';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Tabs, Tab, Box, 
  FormControl, InputLabel, Select, MenuItem, Typography 
} from '@mui/material';

const statusOptions = ["ALL", "ACCEPTED", "REJECTED", "RESCHEDULED", "DONE"];

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [tabIndex, setTabIndex] = useState(0);
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

  // Handler for tab change (for filtering)
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setStatusFilter(statusOptions[newValue]);
  };

  // Handler for dropdown change (for filtering, synchronized with tabs)
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setStatusFilter(value);
    setTabIndex(statusOptions.indexOf(value));
  };

  // Handler for updating appointment status using the dropdown in each row
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await appointmentService.updateAppointmentStatus(appointmentId, newStatus);
      alert("Appointment updated");
      // Update the appointment list locally
      setAppointments(prev =>
        prev.map(app => app.id === appointmentId ? { ...app, status: newStatus } : app)
      );
    } catch (error) {
      console.error("Error updating appointment", error);
      alert("Failed to update appointment");
    }
  };

  // Filter appointments based on the current statusFilter
  const filteredAppointments = statusFilter === "ALL" 
    ? appointments 
    : appointments.filter(app => app.status.toUpperCase() === statusFilter);

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Trainer Appointments
      </Typography>
      
      {/* Tabs and Dropdown Filter */}
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
              <TableCell>Student Name</TableCell>
              <TableCell>Appointment Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(app => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.studentName || app.studentId}</TableCell>
                  <TableCell>{new Date(app.appointmentTime).toLocaleString()}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell align="center">
                    <FormControl variant="outlined" size="small" sx={{ width: 140 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={app.status.toUpperCase()}
                        label="Status"
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      >
                        {["ACCEPTED", "REJECTED", "RESCHEDULED", "DONE"].map(status => (
                          <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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

export default ViewAppointments;
