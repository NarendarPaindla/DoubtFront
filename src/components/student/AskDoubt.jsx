import React, { useState, useEffect } from 'react';
import doubtService from '../../services/doubtService';
import userService from '../../services/userService';
import { Box, Button, TextField, Typography, Paper, Grid, MenuItem } from '@mui/material';

const AskDoubt = () => {
  const [doubtText, setDoubtText] = useState('');
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
      alert("Please select a trainer to address your doubt.");
      return;
    }
    try {
      const doubt = {
        studentId: user.id,
        trainerId: selectedTrainer,
        doubtText
      };
      await doubtService.askDoubt(doubt);
      alert("Doubt posted successfully");
      setDoubtText('');
      setSelectedTrainer('');
    } catch (error) {
      console.error("Error posting doubt", error);
      alert("Error posting doubt");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={4} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Ask a Doubt
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
              label="Your Doubt"
              multiline
              rows={4}
              fullWidth
              required
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Post Doubt
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AskDoubt;
