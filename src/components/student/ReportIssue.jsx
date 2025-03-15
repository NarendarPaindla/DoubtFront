import React, { useState, useEffect } from 'react';
import issueService from '../../services/issueService';
import userService from '../../services/userService';
import { Box, Button, TextField, Typography, Paper, Grid, MenuItem } from '@mui/material';

const ReportIssue = () => {
  const [issueDescription, setIssueDescription] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [trainers, setTrainers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await userService.getAllTrainers();
        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrainer) {
      alert("Please select a trainer for your issue.");
      return;
    }
    try {
      const issue = {
        studentId: user.id,
        trainerId: selectedTrainer,
        issueDescription
      };
      await issueService.reportIssue(issue);
      alert("Issue reported successfully");
      setIssueDescription('');
      setSelectedTrainer('');
    } catch (error) {
      console.error("Error reporting issue", error);
      alert("Error reporting issue");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={4} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Report an Issue
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
                  {trainer.name || trainer.username}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Issue Description"
              multiline
              rows={4}
              fullWidth
              required
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Report Issue
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportIssue;
