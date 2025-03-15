import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';

const TrainerRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]   = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Always set role to TRAINER
      const user = {
        username,
        email,
        password,
        role: "TRAINER"
      };
      const data = await authService.register(user);
      alert("Trainer registration successful!");
      localStorage.setItem("user", JSON.stringify(data));
      
      // Navigate trainer to their dashboard
      navigate("/view-appointments");
    } catch (error) {
      console.error("Registration failed", error);
      if (error.response && error.response.data) {
        alert(error.response.data); // e.g. "Username is already taken" or "Email is already taken"
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Trainer Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            
            {/* Username */}
            <TextField
              label="Username"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />

            {/* Email */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />

            {/* Password */}
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Register as Trainer
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TrainerRegister;
