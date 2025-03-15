import React, { useState } from 'react';
import issueService from '../../services/issueService';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';

const ReportIssue = () => {
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const issue = {
         studentId: JSON.parse(localStorage.getItem("user")).id,
         issueDescription
      };
      await issueService.reportIssue(issue);
      alert("Issue reported successfully");
      setIssueDescription('');
    } catch (error) {
      console.error("Error reporting issue", error);
      alert("Error reporting issue");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={4} sx={{ padding: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Report an Issue
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Report Issue
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportIssue;
