import React, { useState, useEffect } from 'react';
import doubtService from '../../services/doubtService';
import { Grid, Paper, Typography, Box, Divider } from '@mui/material';

const MyDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchMyDoubts = async () => {
      try {
        const data = await doubtService.getAllDoubts();
        const myDoubts = data.filter(doubt => doubt.studentId === user.id);
        setDoubts(myDoubts);
      } catch (error) {
        console.error("Error fetching doubts", error);
      }
    };
    fetchMyDoubts();
  }, [user.id]);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {doubts.map(doubt => (
        <Grid item xs={12} key={doubt.id}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Doubt ID: {doubt.id}</Typography>
            <Typography variant="body1">Doubt: {doubt.doubtText}</Typography>
            <Typography variant="body2" color="textSecondary">
              Posted at: {new Date(doubt.createdAt).toLocaleString()}
            </Typography>
            {doubt.replies && doubt.replies.length > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1">Replies:</Typography>
                {doubt.replies.map((reply, index) => (
                  <Box key={index} sx={{ ml: 2, mt: 1 }}>
                    <Typography variant="body2">{reply.replyText}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Replied at: {new Date(reply.repliedAt).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyDoubts;
