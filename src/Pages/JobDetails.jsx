import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { getWellJobs } from '../api/authService';
import { useSelector } from "react-redux";
import { CircularProgress, Box, Typography, Button } from '@mui/material';
import BaseTable from '../components/BaseTable';

const JobDetails = () => {
  const { wellId } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);

  // Traducciones para tipo, estado y parámetros
  const translations = {
    type: {
      "NEW_WELL": "Nuevo Pozo",
    },
    status: {
      "processed": "Procesado",
      "pending": "Pendiente",
      "failed": "Fallido",
    },
    parameters: {
      "filename": "Nombre de Archivo",
    }
  };

  // Función para traducir los trabajos
  const translateJobData = (job) => ({
    ...job,
    type: translations.type[job.type] || job.type,
    status: translations.status[job.status] || job.status,
    parameters: translateParameters(job.parameters),
  });

  // Función para traducir los parámetros del trabajo
  const translateParameters = (parameters) => {
    if (!parameters) return parameters;
    return Object.entries(parameters).reduce((acc, [key, value]) => {
      acc[translations.parameters[key] || key] = value;
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (!dataAuthentication || !dataAuthentication.access_token) {
          console.error("No access token available");
          return;
        }

        const token = dataAuthentication.access_token;
        const data = await getWellJobs(token, wellId);
        const translatedJobs = data.map(translateJobData); // Traducir los trabajos
        setJobs(translatedJobs);
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
    { id: 'user_id', label: 'ID De Usuario' },
    { id: 'type', label: 'Tipo' },
    { id: 'parameters', label: 'Parámetros', render: (job) => renderParameters(job.parameters) },
    { id: 'status', label: 'Estado' },
    { id: 'created_at', label: 'Fecha De Creación', render: (job) => new Date(job.created_at).toLocaleString() },
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
          Procesamientos De Pozo {wellId}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(`/wells/${wellId}/createJob`)}>
          Crear Proceso
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

export default JobDetails;
