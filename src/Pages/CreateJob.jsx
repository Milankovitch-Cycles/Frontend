import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, MenuItem, Typography, Grid, Slider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Scatter } from 'recharts';
import { getWellById, createJob } from '../api/authService';
import Papa from 'papaparse';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const jobTypes = [
  { value: 'MILANKOVIC_CYCLES', label: 'Milankovitch Cycle Analysis' },
];

const CreateJob = () => {
  const { wellId } = useParams();
  const navigate = useNavigate();
  const [jobType, setJobType] = useState('MILANKOVIC_CYCLES');
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(100);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    const fetchWellData = async () => {
      try {
        if (!dataAuthentication || !dataAuthentication.access_token) {
          console.error("No access token available");
          return;
        }

        const token = dataAuthentication.access_token;
        const wellData = await getWellById(token, wellId);
        const job = wellData.jobs[0]; // Assuming you want to use the first job's CSV file

        if (job && job.result && job.result.gamma_ray_path) {
          const csvUrl = transformCsvUrl(job.result.gamma_ray_path);
          const response = await fetch(csvUrl);
          const csvText = await response.text();
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
              const transformedData = result.data.map((row) => ({
                ...row,
                GR: parseInt(row.GR, 10),
                TEMP_DEPTH: parseInt(row.TEMP_DEPTH, 10),
              }));
              setData(transformedData);
              setLoading(false);
            },
            error: (error) => {
              setError('Error parsing CSV data');
              setLoading(false);
            },
          });
        } else {
          setError('No CSV data available');
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching well data');
        setLoading(false);
      }
    };

    fetchWellData();
  }, [wellId, dataAuthentication]);

  const transformCsvUrl = (url) => {
    return url.replace('./static', 'http://localhost:8080/static');
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleStartChange = (event, newValue) => {
    if (newValue >= end) {
      return;
    }
    setStart(newValue);
  };

  const handleEndChange = (event, newValue) => {
    if (newValue <= start) {
      return;
    }
    setEnd(newValue);
  };

  const handleChartClick = (e) => {
    if (e && e.activeLabel) {
      const value = e.activeLabel;
      if (Math.abs(value - start) < Math.abs(value - end)) {
        if (value < end) {
          setStart(value);
        }
      } else {
        if (value > start) {
          setEnd(value);
        }
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (!dataAuthentication || !dataAuthentication.access_token) {
        console.error("No access token available");
        return;
      }

      const token = dataAuthentication.access_token;
      const jobData = {
        type: jobType,
        parameters: {
          min_window: data[start].TEMP_DEPTH,
          max_window: data[end].TEMP_DEPTH,
        },
      };

      await createJob(token, wellId, jobData);
      navigate(`/wells/${wellId}/jobs`);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Crear Procesamiento Para Pozo {wellId}
      </Typography>
      <Box mb={2}>
        <TextField
          select
          label="Tipo De Procesamiento"
          value={jobType}
          onChange={handleJobTypeChange}
          fullWidth
          variant="outlined"
          margin="normal"
        >
          {jobTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box mb={2}>
        <Typography variant="h6">Seleccionar Ventana De Análisis</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Inicio</Typography>
            <Slider
              value={start}
              onChange={handleStartChange}
              aria-labelledby="start-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={data.length - 1}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Fin</Typography>
            <Slider
              value={end}
              onChange={handleEndChange}
              aria-labelledby="end-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={data.length - 1}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} onClick={handleChartClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="TEMP_DEPTH" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="GR" stroke="#8884d8" />
            <Scatter dataKey="GR" fill="red" />
            <ReferenceLine x={data[start]?.TEMP_DEPTH} stroke="red" label="Start" strokeWidth={4} />
            <ReferenceLine x={data[end]?.TEMP_DEPTH} stroke="green" label="End" strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Job
      </Button>
    </Box>
  );
};

export default CreateJob;