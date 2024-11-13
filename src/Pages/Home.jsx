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

        // Assuming recent activity is the latest jobs
        setRecentActivity(jobsData.jobs.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [dataAuthentication]);

  const completedJobs = jobs.filter(job => job.status === 'completed').length;
  const pendingJobs = jobs.filter(job => job.status === 'pending').length;

  const pieData = [
    { name: 'Completed', value: completedJobs },
    { name: 'Pending', value: pendingJobs },
  ];

  const COLORS = ['#0088FE', '#FFBB28'];

  const barData = [
    { name: 'Day 1', jobs: 5 },
    { name: 'Day 2', jobs: 3 },
    { name: 'Day 3', jobs: 4 },
    { name: 'Day 4', jobs: 7 },
    { name: 'Day 5', jobs: 2 },
    { name: 'Day 6', jobs: 6 },
    { name: 'Day 7', jobs: 4 },
  ];

  return (
    <Box p={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                  Jobs Status
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
                      Number of Wells
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
                      Number of Jobs
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
                Jobs per Day (Last 7 Days)
              </Typography>
              <BarChart width={500} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobs" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {recentActivity.map((job, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="body2">
                            <strong>Type:</strong> {job.type}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Status:</strong> {job.status}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Created At:</strong> {new Date(job.created_at).toLocaleString()}
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