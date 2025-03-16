import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      alert("Invalid reset link");
      navigate('/login');
    }
  }, [location.search, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await authService.resetPassword(token, newPassword);
      alert(message);
      navigate('/login');
    } catch (error) {
      console.error("Reset password error", error);
      alert("Failed to reset password");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Reset Password
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
