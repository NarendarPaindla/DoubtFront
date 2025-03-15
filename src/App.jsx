import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BookAppointment from './components/student/BookAppointment';
import AskDoubt from './components/student/AskDoubt';
import ReportIssue from './components/student/ReportIssue';
import Announcements from './components/student/Announcements';
import MyAppointments from './components/student/MyAppointments';
import MyDoubts from './components/student/MyDoubts';
import MyIssues from './components/student/MyIssues';
import ViewAppointments from './components/trainer/ViewAppointments';
import ViewDoubts from './components/trainer/ViewDoubts';
import ManageIssues from './components/trainer/ManageIssues';
import PostAnnouncement from './components/trainer/PostAnnouncement';
import Sidebar from './components/Sidebar';

const drawerWidth = 240;

const App = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {user && <Sidebar drawerWidth={drawerWidth} />}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            width: user ? `calc(100% - ${drawerWidth}px)` : '100%',
            ml: user ? `${drawerWidth}px` : 0,
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Doubt Solving App
            </Typography>
            {user ? (
              <>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Hello, {user.username}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {user && user.role?.toUpperCase() === "STUDENT" && (
              <>
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/my-appointments" element={<MyAppointments />} />
                <Route path="/ask-doubt" element={<AskDoubt />} />
                <Route path="/my-doubts" element={<MyDoubts />} />
                <Route path="/report-issue" element={<ReportIssue />} />
                <Route path="/my-issues" element={<MyIssues />} />
                <Route path="/announcements" element={<Announcements />} />
              </>
            )}
            {user && user.role?.toUpperCase() === "TRAINER" && (
              <>
                <Route path="/view-appointments" element={<ViewAppointments />} />
                <Route path="/view-doubts" element={<ViewDoubts />} />
                <Route path="/manage-issues" element={<ManageIssues />} />
                <Route path="/post-announcement" element={<PostAnnouncement />} />
              </>
            )}
            <Route
              path="*"
              element={
                user
                  ? (user.role?.toUpperCase() === "TRAINER"
                      ? <Navigate to="/view-appointments" />
                      : <Navigate to="/book-appointment" />
                    )
                  : <Navigate to="/login" />
              }
            />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
