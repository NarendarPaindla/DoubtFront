import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await authService.forgotPassword(email);
      alert(message);
      navigate('/login');
    } catch (error) {
      console.error("Forgot password error", error);
      alert("Error sending reset email");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Enter your email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Send Reset Link
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
