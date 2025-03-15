import React, { useEffect, useState } from 'react';
import issueService from '../../services/issueService';
import userService from '../../services/userService';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Button
} from '@mui/material';

const ManageIssues = () => {
  const [issues, setIssues] = useState([]);
  const [studentNames, setStudentNames] = useState({});

  // Fetch issues on mount
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await issueService.getIssues();
        setIssues(data);

        // Build a map of student names
        const uniqueIds = [...new Set(data.map(issue => issue.studentId))];
        const namesMap = {};
        for (let id of uniqueIds) {
          try {
            const student = await userService.getUserById(id);
            namesMap[id] = student.name || student.username;
          } catch (err) {
            namesMap[id] = id;
          }
        }
        setStudentNames(namesMap);

      } catch (error) {
        console.error("Error fetching issues", error);
      }
    };
    fetchIssues();
  }, []);

  // Handle resolving an issue
  const handleResolve = async (issueId) => {
    try {
      await issueService.resolveIssue(issueId);
      alert("Issue resolved");
      // Update local state so the status becomes RESOLVED
      setIssues(prev =>
        prev.map(issue =>
          issue.id === issueId
            ? { ...issue, status: "RESOLVED", resolvedAt: new Date().toISOString() }
            : issue
        )
      );
    } catch (error) {
      console.error("Error resolving issue", error);
      alert("Failed to resolve issue");
    }
  };

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Manage Issues
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Issue ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Issue Description</TableCell>
              <TableCell>Reported At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map(issue => (
              <TableRow key={issue.id}>
                <TableCell>{issue.id}</TableCell>
                <TableCell>{studentNames[issue.studentId] || issue.studentId}</TableCell>
                <TableCell>{issue.issueDescription}</TableCell>
                <TableCell>{new Date(issue.createdAt).toLocaleString()}</TableCell>
                <TableCell>{issue.status}</TableCell>
                <TableCell align="center">
                  {issue.status === "RESOLVED" ? (
                    "Resolved"
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleResolve(issue.id)}
                    >
                      Resolve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {issues.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No issues found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ManageIssues;
