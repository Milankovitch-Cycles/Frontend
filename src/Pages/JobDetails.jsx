import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWellJobs } from '../api/authService';
import { useSelector } from "react-redux";
import { CircularProgress, Box, Typography } from '@mui/material';
import BaseTable from '../components/BaseTable';

const JobDetails = () => {
  const { wellId } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (!dataAuthentication || !dataAuthentication.access_token) {
          console.error("No access token available");
          return;
        }

        const token = dataAuthentication.access_token;
        const data = await getWellJobs(token, wellId);
        setJobs(data);
      } catch (error) {
        setError('Error fetching job details');
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [wellId, dataAuthentication]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
  }

  if (jobs.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>No job details available</Typography></Box>;
  }

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'user_id', label: 'User ID' },
    { id: 'type', label: 'Type' },
    { id: 'parameters', label: 'Parameters', render: (job) => JSON.stringify(job.parameters) },
    { id: 'result', label: 'Result', render: (job) => JSON.stringify(job.result) },
    { id: 'status', label: 'Status' },
    { id: 'created_at', label: 'Created At', render: (job) => new Date(job.created_at).toLocaleString() },
  ];

  const actions = {
    view: (id) => navigate(`/wells/${wellId}/jobs/${id}`),
  };

  return (
    <Box display="flex" flexDirection="column" p={2}>
      <Typography variant="h4" gutterBottom>
        Jobs from Well {wellId}
      </Typography>
      <BaseTable
        data={jobs}
        columns={columns}
        onSort={() => {}}
        sortDirection="asc"
        orderBy="id"
        actions={actions}
      />
    </Box>
  );
};

export default JobDetails;
