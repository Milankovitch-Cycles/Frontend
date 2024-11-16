import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Divider, CircularProgress, Modal, IconButton } from '@mui/material';
import { getJobById } from '../api/authService';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

const JobDetails = () => {
  const { wellId, jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        if (!dataAuthentication || !dataAuthentication.access_token) {
          console.error("No access token available");
          return;
        }

        const token = dataAuthentication.access_token;
        const data = await getJobById(token, jobId, wellId);
        setJobData(data);
      } catch (error) {
        setError('Error fetching job data');
        console.error('Error fetching job data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [wellId, jobId, dataAuthentication]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
  }

  if (!jobData) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>No job data available</Typography></Box>;
  }

  const transformGraphUrl = (url) => {
    return url.replace('./static', 'http://localhost:8080/static');
  };

  const handleOpenModal = (graph) => {
    setSelectedGraph(graph);
  };

  const handleCloseModal = () => {
    setSelectedGraph(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Job Details
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Job Information</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography><strong>ID:</strong> {jobData.id}</Typography>
          <Typography><strong>User ID:</strong> {jobData.user_id}</Typography>
          <Typography><strong>Type:</strong> {jobData.type}</Typography>
          <Typography><strong>Status:</strong> {jobData.status}</Typography>
          <Typography><strong>Created At:</strong> {new Date(jobData.created_at).toLocaleString()}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Parameters</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography><strong>Filename:</strong> {jobData.parameters.filename}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Result Graphs</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {jobData.result.graphs.map((graph, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card onClick={() => handleOpenModal(transformGraphUrl(graph.image))} sx={{ cursor: 'pointer' }}>
                  <CardContent>
                    <Typography variant="subtitle1">{graph.title}</Typography>
                    <Box
                      component="img"
                      src={transformGraphUrl(graph.image)}
                      alt={graph.title}
                      sx={{ width: '100%', height: 'auto', mt: 2 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Modal
        open={!!selectedGraph}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedGraph && (
            <Box>
              <Typography id="modal-title" variant="h6" component="h2" mb={2}>
                Graph Details
              </Typography>
              <Box
                component="img"
                src={selectedGraph}
                alt="Graph Detail"
                sx={{ width: '100%', height: 'auto' }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default JobDetails;