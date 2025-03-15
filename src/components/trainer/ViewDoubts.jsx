import React, { useEffect, useState } from 'react';
import doubtService from '../../services/doubtService';
import userService from '../../services/userService';
import { Grid, Paper, Typography, Box, TextField, Button, Divider } from '@mui/material';

const ViewDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [studentNames, setStudentNames] = useState({});

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const data = await doubtService.getAllDoubts();
        setDoubts(data);
        const uniqueIds = [...new Set(data.map(doubt => doubt.studentId))];
        const namesMap = {};
        await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const student = await userService.getUserById(id);
              namesMap[id] = student.username;
            } catch (err) {
              namesMap[id] = id;
            }
          })
        );
        setStudentNames(namesMap);
      } catch (error) {
        console.error("Error fetching doubts", error);
      }
    };
    fetchDoubts();
  }, []);

  const handleReply = async (doubtId) => {
    try {
      const reply = {
        trainerId: JSON.parse(localStorage.getItem("user")).id,
        replyText,
        repliedAt: new Date().toISOString()
      };
      await doubtService.replyToDoubt(doubtId, reply);
      alert("Reply sent");
      setReplyText('');
      window.location.reload();
    } catch (error) {
      console.error("Error sending reply", error);
    }
  };

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {doubts.map(doubt => (
        <Grid item xs={12} key={doubt.id}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Doubt ID: {doubt.id}</Typography>
            <Typography variant="body1">
              Student: {studentNames[doubt.studentId] || doubt.studentId}
            </Typography>
            <Typography variant="body1">Doubt: {doubt.doubtText}</Typography>
            <Typography variant="body2" color="textSecondary">
              Posted at: {new Date(doubt.createdAt).toLocaleString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <TextField
              label="Reply"
              fullWidth
              multiline
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={() => handleReply(doubt.id)}>
              Send Reply
            </Button>
            {doubt.replies && doubt.replies.map((reply, index) => (
              <Paper key={index} elevation={1} sx={{ p: 2, mt: 2 }}>
                <Typography variant="body2">{reply.replyText}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Replied at: {new Date(reply.repliedAt).toLocaleString()}
                </Typography>
              </Paper>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ViewDoubts;
