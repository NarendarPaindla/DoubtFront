import React, { useState } from 'react';
import announcementService from '../../services/announcementService';
import { Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';

const PostAnnouncement = () => {
  const [announcementText, setAnnouncementText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const announcement = {
         trainerId: JSON.parse(localStorage.getItem("user")).id,
         announcementText
      };
      await announcementService.postAnnouncement(announcement);
      alert("Announcement posted");
      setAnnouncementText('');
    } catch (error) {
      console.error("Error posting announcement", error);
      alert("Error posting announcement");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Paper elevation={4} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Post Announcement
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Announcement"
              multiline
              rows={4}
              fullWidth
              required
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Post
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PostAnnouncement;
