import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { getWellJobs } from '../api/authService';
import { useSelector } from "react-redux";
import { CircularProgress, Box, Typography, Button } from '@mui/material';
import BaseTable from '../components/BaseTable';
import { useTranslation } from 'react-i18next';

const JobsFromWell = () => {
  const { wellId } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);
  const { t } = useTranslation();

  const translateJobData = (job) => ({
    ...job,
    type: t(`type.${job.type}`, { defaultValue: job.type }),
    status: t(`status.${job.status}`, { defaultValue: job.status }),
    parameters: translateParameters(job.parameters),
  });

  const translateParameters = (parameters) => {
    if (!parameters) return parameters;
    return Object.entries(parameters).reduce((acc, [key, value]) => {
      acc[t(`parameters.${key}`, { defaultValue: key })] = value;
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchJobsFromWell = async () => {
      try {
        if (!dataAuthentication || !dataAuthentication.access_token) {
          console.error("No access token available");
          return;
        }

        const token = dataAuthentication.access_token;
        const data = await getWellJobs(token, wellId);
        const translatedJobs = data.map(translateJobData);
        setJobs(translatedJobs);
      } catch (error) {
        setError('Error fetching job details');
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsFromWell();
  }, [wellId, dataAuthentication]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
  }

  if (jobs.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>{t('noJobsAvailable')}</Typography></Box>;
  }

  const columns = [
    { id: 'id', label: t('columns.id') },
    { id: 'user_id', label: t('columns.user_id') },
    { id: 'type', label: t('columns.type') },
    { id: 'parameters', label: t('columns.parameters'), render: (job) => renderParameters(job.parameters) },
    { id: 'status', label: t('columns.status') },
    { id: 'created_at', label: t('columns.created_at'), render: (job) => new Date(job.created_at).toLocaleString() },
  ];

  const actions = {
    view: (id) => navigate(`/wells/${wellId}/jobs/${id}`),
  };

  const renderParameters = (parameters) => {
    return (
      <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
        {Object.entries(parameters).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Box display="flex" flexDirection="column" p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
        {t('wellProcessing')} {wellId}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(`/wells/${wellId}/createJob`)}>
          {t('createJob')}
        </Button>
      </Box>
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

export default JobsFromWell;
