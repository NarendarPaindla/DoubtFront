import React, { useState, useEffect } from 'react';
import issueService from '../../services/issueService';
import { Grid, Paper, Typography, Divider } from '@mui/material';

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const data = await issueService.getIssues();
        const myIssues = data.filter(issue => issue.studentId === user.id);
        setIssues(myIssues);
      } catch (error) {
        console.error("Error fetching issues", error);
      }
    };
    fetchMyIssues();
  }, [user.id]);

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {issues.map(issue => (
        <Grid item xs={12} key={issue.id}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Issue ID: {issue.id}</Typography>
            <Typography variant="body1">Issue: {issue.issueDescription}</Typography>
            <Typography variant="body1">Status: {issue.status}</Typography>
            <Typography variant="body2" color="textSecondary">
              Reported at: {new Date(issue.createdAt).toLocaleString()}
            </Typography>
            {issue.resolvedAt && (
              <Typography variant="body2" color="textSecondary">
                Resolved at: {new Date(issue.resolvedAt).toLocaleString()}
              </Typography>
            )}
            <Divider sx={{ my: 1 }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyIssues;
