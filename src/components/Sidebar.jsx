import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon,
  ListItemText, Divider, Box, Toolbar
} from '@mui/material';
import { Link } from 'react-router-dom';

// Icons for student
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ReportIcon from '@mui/icons-material/Report';
import AnnouncementIcon from '@mui/icons-material/Announcement';

// Icons for trainer
import PostAddIcon from '@mui/icons-material/PostAdd';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const Sidebar = ({ drawerWidth }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user ? user.role.trim().toUpperCase() : null;

  let menuItems = [];

  if (role === "STUDENT") {
    menuItems = [
      { text: 'Book Appointment', icon: <BookIcon />, path: '/book-appointment' },
      { text: 'My Appointments', icon: <AssignmentIcon />, path: '/my-appointments' },
      { text: 'Ask Doubt', icon: <QuestionAnswerIcon />, path: '/ask-doubt' },
      { text: 'My Doubts', icon: <QuestionAnswerIcon />, path: '/my-doubts' },
      { text: 'Report Issue', icon: <ReportIcon />, path: '/report-issue' },
      { text: 'My Issues', icon: <ReportIcon />, path: '/my-issues' },
      { text: 'Announcements', icon: <AnnouncementIcon />, path: '/announcements' },
    ];
  } else if (role === "TRAINER") {
    menuItems = [
      { text: 'View Appointments', icon: <ViewAgendaIcon />, path: '/view-appointments' },
      { text: 'View Doubts', icon: <QuestionAnswerIcon />, path: '/view-doubts' },
      { text: 'Manage Issues', icon: <SupervisorAccountIcon />, path: '/manage-issues' },
      { text: 'Post Announcement', icon: <PostAddIcon />, path: '/post-announcement' },
    ];
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
