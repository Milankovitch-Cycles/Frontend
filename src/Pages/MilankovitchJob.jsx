import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, IconButton } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TimelineIcon from '@mui/icons-material/Timeline';
import BuildIcon from '@mui/icons-material/Build';
import EmailIcon from '@mui/icons-material/Email';

const MilankovitchJob = () => {
  // Hardcoded data
  const jobData = {
    startTime: '2024-10-30T21:33:54',
    endTime: '2024-10-30T22:33:54',
    duration: '1 hour',
    highFrequencies: [0.1, 0.2, 0.3, 0.4],
    knownFrequencies: [
      { title: 'Excentricidad', frequency: 0.1, matchPercentage: 95 },
      { title: 'Oblicuidad', frequency: 0.2, matchPercentage: 90 },
      { title: 'Precesión', frequency: 0.3, matchPercentage: 85 },
    ],
    comments: '',
    wellMetadata: {
      name: 'Well A',
      location: 'Location X',
      depth: '3000m',
    },
    analysisWindow: {
      start: 100,
      end: 200,
    },
  };

  const [comments, setComments] = useState(jobData.comments);

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleRedoJob = () => {
    // Logic to redo the job with modified window parameters
    console.log('Redo job with modified window parameters');
  };

  const handleSendPdf = () => {
    // Logic to send the result as PDF to a mail
    console.log('Send result as PDF to a mail');
  };

  // Generate sinusoidal data for the graph
  const data = Array.from({ length: 100 }, (_, i) => ({
    x: i + 1,
    y: Math.sin((i + 1) * 0.1),
  }));

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Milankovitch Job Result
      </Typography>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Well Metadata</Typography>
                <IconButton>
                  <LocationOnIcon />
                </IconButton>
              </Box>
              <Typography>Name: {jobData.wellMetadata.name}</Typography>
              <Typography>Location: {jobData.wellMetadata.location}</Typography>
              <Typography>Depth: {jobData.wellMetadata.depth}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Analysis Window</Typography>
                <IconButton>
                  <TimelineIcon />
                </IconButton>
              </Box>
              <Typography>Start: {jobData.analysisWindow.start}</Typography>
              <Typography>End: {jobData.analysisWindow.end}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Time Information</Typography>
                <IconButton>
                  <AccessTimeIcon />
                </IconButton>
              </Box>
              <Typography>Start Time: {new Date(jobData.startTime).toLocaleString()}</Typography>
              <Typography>End Time: {new Date(jobData.endTime).toLocaleString()}</Typography>
              <Typography>Duration: {jobData.duration}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mb={2}>
        <Typography variant="h6">High Frequencies Detected</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Comparison to Known Frequencies</Typography>
        <Grid container spacing={2}>
          {jobData.knownFrequencies.map((freq, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{freq.title}</Typography>
                  <Typography>Frequency: {freq.frequency}</Typography>
                  <Typography>Match Percentage: {freq.matchPercentage}%</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Comments</Typography>
        <TextField
          label="Leave a comment"
          value={comments}
          onChange={handleCommentsChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
      </Box>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleRedoJob} startIcon={<BuildIcon />}>
            Redo Job
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleSendPdf} startIcon={<EmailIcon />}>
            Send as PDF
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MilankovitchJob;