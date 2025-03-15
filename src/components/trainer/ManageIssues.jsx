import React, { useEffect, useState } from 'react';
import issueService from '../../services/issueService';
import userService from '../../services/userService';
import { Grid, Paper, Typography, Button, Box, Divider } from '@mui/material';

const ManageIssues = () => {
  const [issues, setIssues] = useState([]);
  const [studentNames, setStudentNames] = useState({});

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await issueService.getIssues();
        setIssues(data);
        const uniqueIds = [...new Set(data.map(issue => issue.studentId))];
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
        console.error("Error fetching issues", error);
      }
    };
    fetchIssues();
  }, []);

  const handleResolve = async (issueId) => {
    try {
      await issueService.resolveIssue(issueId);
      alert("Issue resolved");
      window.location.reload();
    } catch (error) {
      console.error("Error resolving issue", error);
    }
  };

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {issues.map(issue => (
        <Grid item xs={12} key={issue.id}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Issue ID: {issue.id}</Typography>
            <Typography variant="body1">
              Student: {studentNames[issue.studentId] || issue.studentId}
            </Typography>
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
            <Divider sx={{ my: 2 }} />
            {issue.status !== "RESOLVED" && (
              <Button variant="contained" color="primary" onClick={() => handleResolve(issue.id)}>
                Resolve Issue
              </Button>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ManageIssues;
