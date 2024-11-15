import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, MenuItem, Typography, Grid, Slider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const jobTypes = [
  { value: 'type1', label: 'Type 1' },
  { value: 'type2', label: 'Type 2' },
  { value: 'type3', label: 'Type 3' },
];

// Generate 100 points for the chart
const data = Array.from({ length: 100 }, (_, i) => ({
  x: i + 1,
  y: Math.floor(Math.random() * 1000) + 1,
}));

const CreateJob = () => {
  const { wellId } = useParams();
  const [jobType, setJobType] = useState('');
  const [coefficients, setCoefficients] = useState({ coef1: '', coef2: '', coef3: '' });
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(100);

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleCoefficientChange = (event) => {
    setCoefficients({ ...coefficients, [event.target.name]: event.target.value });
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

  const handleSubmit = () => {
    // Handle job creation logic here
    console.log({ wellId, jobType, coefficients, start, end });
  };

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
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Coeficiente 1"
              name="coef1"
              value={coefficients.coef1}
              onChange={handleCoefficientChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Coeficiente 2"
              name="coef2"
              value={coefficients.coef2}
              onChange={handleCoefficientChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Coeficiente 3"
              name="coef3"
              value={coefficients.coef3}
              onChange={handleCoefficientChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
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
              min={1}
              max={100}
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
              min={1}
              max={100}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} onClick={handleChartClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
            <ReferenceLine x={start} stroke="red" label="Start" strokeWidth={4} />
            <ReferenceLine x={end} stroke="green" label="End" strokeWidth={4} />
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