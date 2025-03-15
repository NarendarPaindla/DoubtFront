import React, { useState } from 'react';
import doubtService from '../../services/doubtService';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';

const AskDoubt = () => {
  const [doubtText, setDoubtText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doubt = {
         studentId: JSON.parse(localStorage.getItem("user")).id,
         doubtText
      };
      await doubtService.askDoubt(doubt);
      alert("Doubt posted successfully");
      setDoubtText('');
    } catch (error) {
      console.error("Error posting doubt", error);
      alert("Error posting doubt");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={4} sx={{ padding: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Ask a Doubt
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Post Doubt
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AskDoubt;
