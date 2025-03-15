import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import { Box, Button, TextField, Typography, Paper, Grid, MenuItem } from '@mui/material';

const genderOptions = ["Male", "Female", "Other"];
const programLevels = ["csbeta", "csalpha", "iotalpha"];
const degreeLevels = ["Bachelor's", "Master's", "PhD."];
const academicYears = [
  "1st Year (Freshman)",
  "2nd Year (Sophomore)",
  "3rd Year (Junior)",
  "4th Year (Senior)"
];

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT'); // For student registration
  const [gender, setGender] = useState('');
  const [programLevel, setProgramLevel] = useState('');
  const [degreeLevel, setDegreeLevel] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [university, setUniversity] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email,
        username,
        password,
        role,
        gender,
        programLevel,
        degreeLevel,
        academicYear,
        university
      };
      const data = await authService.register(user);
      if (typeof data === "string") {
        alert(data);
        return;
      }
      alert("Registration successful");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/book-appointment");
    } catch (error) {
      console.error("Registration failed", error);
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={7}>
        <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Student Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Username"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            {/* Role is fixed as STUDENT */}
            <TextField
              select
              label="Gender"
              fullWidth
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              margin="normal"
            >
              {genderOptions.map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Program Level"
              fullWidth
              required
              value={programLevel}
              onChange={(e) => setProgramLevel(e.target.value)}
              margin="normal"
            >
              {programLevels.map(pl => (
                <MenuItem key={pl} value={pl}>{pl}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Degree Level"
              fullWidth
              required
              value={degreeLevel}
              onChange={(e) => setDegreeLevel(e.target.value)}
              margin="normal"
            >
              {degreeLevels.map(dl => (
                <MenuItem key={dl} value={dl}>{dl}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Academic Year"
              fullWidth
              required
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              margin="normal"
            >
              {academicYears.map(ay => (
                <MenuItem key={ay} value={ay}>{ay}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="University"
              fullWidth
              required
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Register
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

export default Register;
