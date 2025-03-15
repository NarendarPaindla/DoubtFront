import React, { useEffect, useState } from 'react';
import announcementService from '../../services/announcementService';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementService.getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements", error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {announcements.map((ann) => (
        <Grid item xs={12} key={ann.id}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="body1">{ann.announcementText}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" color="textSecondary">
              {new Date(ann.createdAt).toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Announcements;
