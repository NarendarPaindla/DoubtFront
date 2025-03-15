import React, { useEffect, useState } from 'react';
import doubtService from '../../services/doubtService';
import userService from '../../services/userService';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Button,
  Box, Drawer, TextField
} from '@mui/material';

/**
 * This component shows a table of doubts.
 * Clicking "Reply" opens a bottom-anchored chat panel for that specific doubt.
 */
const ViewDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [activeDoubt, setActiveDoubt] = useState(null); // The selected doubt for the chat
  const [chatOpen, setChatOpen] = useState(false);       // Controls the bottom drawer
  const [studentNames, setStudentNames] = useState({});  // Maps studentId -> studentName
  const [newReply, setNewReply] = useState('');          // Text for the new reply message

  // Fetch all doubts on mount
  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const data = await doubtService.getAllDoubts();
        setDoubts(data);

        // Build map of student names for display
        const uniqueIds = [...new Set(data.map(d => d.studentId))];
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
        console.error("Error fetching doubts:", error);
      }
    };
    fetchDoubts();
  }, []);

  // Open the chat drawer for a specific doubt
  const openChat = (doubt) => {
    setActiveDoubt(doubt);
    setChatOpen(true);
    setNewReply('');
  };

  // Close the chat drawer
  const closeChat = () => {
    setChatOpen(false);
    setActiveDoubt(null);
    setNewReply('');
  };

  // Handle sending a new reply
  const handleSendReply = async () => {
    if (!activeDoubt) return;
    try {
      const trainerId = JSON.parse(localStorage.getItem("user")).id;
      const reply = {
        trainerId,
        replyText: newReply,
        repliedAt: new Date().toISOString()
      };
      await doubtService.replyToDoubt(activeDoubt.id, reply);

      // Update local state so the new reply appears in the conversation
      setDoubts(prev => prev.map(d => 
        d.id === activeDoubt.id
          ? { ...d, replies: [...(d.replies || []), reply] }
          : d
      ));

      // Also update activeDoubt's replies
      setActiveDoubt(prev => ({
        ...prev,
        replies: [...(prev.replies || []), reply]
      }));

      setNewReply('');
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply");
    }
  };

  // For chat bubble styling, you might align trainer replies to the right,
  // student messages to the left, etc. We'll do a simple color distinction:
  const isTrainerMessage = (reply) => {
    const trainerId = JSON.parse(localStorage.getItem("user")).id;
    return reply.trainerId === trainerId;
  };

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        View Doubts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doubt ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Doubt</TableCell>
              <TableCell>Posted At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doubts.map((doubt) => {
              const replied = doubt.replies && doubt.replies.length > 0;
              return (
                <TableRow key={doubt.id}>
                  <TableCell>{doubt.id}</TableCell>
                  <TableCell>{studentNames[doubt.studentId] || doubt.studentId}</TableCell>
                  <TableCell>{doubt.doubtText}</TableCell>
                  <TableCell>{new Date(doubt.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{replied ? "Replied" : "Open"}</TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="contained" 
                      size="small" 
                      onClick={() => openChat(doubt)}
                    >
                      Reply
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {doubts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No doubts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bottom-anchored chat drawer */}
      <Drawer
        anchor="bottom"
        open={chatOpen}
        onClose={closeChat}
        PaperProps={{ sx: { height: 400, borderRadius: '12px 12px 0 0' } }}
      >
        {activeDoubt && (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Chat with Student</Typography>
              <Button variant="outlined" size="small" onClick={closeChat}>Close</Button>
            </Box>
            <Typography variant="subtitle2" color="textSecondary">
              Doubt: {activeDoubt.doubtText}
            </Typography>

            {/* Chat messages area */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', my: 2, p: 1, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
              {/* Original Doubt as first message (optional if you want a separate bubble) */}
              {/* Then replies */}
              {activeDoubt.replies && activeDoubt.replies.map((reply, index) => {
                const trainerId = JSON.parse(localStorage.getItem("user")).id;
                const isTrainerMsg = reply.trainerId === trainerId;
                return (
                  <Box
                    key={index}
                    sx={{
                      mb: 1,
                      p: 1,
                      maxWidth: '70%',
                      alignSelf: isTrainerMsg ? 'flex-end' : 'flex-start',
                      backgroundColor: isTrainerMsg ? '#cce5ff' : '#e2e2e2',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2">{reply.replyText}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                      {new Date(reply.repliedAt).toLocaleString()}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Reply input area */}
            <Box sx={{ display: 'flex' }}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Type your reply..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <Button variant="contained" sx={{ ml: 1 }} onClick={handleSendReply}>
                Send
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Paper>
  );
};

export default ViewDoubts;
