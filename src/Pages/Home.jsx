import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getWells, getJobs } from '../api/authService';
import { useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';

const Home = () => {
  const [wells, setWells] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [barData, setBarData] = useState([]);
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    async function fetchData() {
      if (!dataAuthentication || !dataAuthentication.access_token) {
        console.error("No access token available");
        return;
      }
      const token = dataAuthentication.access_token;
      try {
        const wellsData = await getWells(token);
        setWells(wellsData.wells || []);
        const jobsData = await getJobs(token, 10, 0);
        setJobs(jobsData.jobs);

        setRecentActivity(jobsData.jobs.slice(0, 5));


        const last7Days = Array.from({ length: 7 }, (_, i) => ({
          name: `Día ${1 + i}`,
          jobs: 0,
        }));


        jobsData.jobs.forEach(job => {
          const jobDate = new Date(job.created_at).toLocaleDateString();
          const dayIndex = last7Days.findIndex((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - index));
            return date.toLocaleDateString() === jobDate;
          });
          if (dayIndex !== -1) {
            last7Days[dayIndex].jobs += 1;
          }
        });

        setBarData(last7Days);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [dataAuthentication]);

  const completedJobs = jobs.filter(job => job.status === 'processed').length;
  const pendingJobs = jobs.filter(job => job.status !== 'processed').length;

  const pieData = [
    { name: 'Completado', value: completedJobs },
    { name: 'Pendiente', value: pendingJobs },
  ];

  const COLORS = ['#0088FE', '#FFBB28'];

  return (
    <Box p={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                  Estado Del Proceso
                </Typography>
                <IconButton>
                  <AssignmentIcon />
                </IconButton>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <Box ml={2}>
                  {pieData.map((entry, index) => (
                    <Box key={`legend-${index}`} display="flex" alignItems="center" mb={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          backgroundColor: COLORS[index % COLORS.length],
                          marginRight: 1,
                        }}
                      />
                      <Typography variant="body2">{entry.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2} direction="column" sx={{ height: '100%' }}>
            <Grid item xs={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                      Nombre De Pozos
                    </Typography>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h4">{wells.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                      Cantidad De Pozos
                    </Typography>
                    <IconButton>
                      <BarChartIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h4">{jobs.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Procesos Por Días (Último 7 días)
              </Typography>
              <BarChart width={500} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}`, "Procesos"]} />
                <Legend />
                <Bar dataKey="jobs" fill="#8884d8" name="Procesos" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actividad Reciente
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {recentActivity.map((job, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="body2">
                            <strong>Tipo:</strong> {job.type}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Estado:</strong> {job.status}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Fecha De Creación:</strong> {new Date(job.created_at).toLocaleString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
