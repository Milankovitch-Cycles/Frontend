import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Divider, CircularProgress, Modal, IconButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { getJobById } from '../api/authService';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const JobDetails = () => {
  const { t } = useTranslation(); // Importar la función de traducción
  const { wellId, jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [frequenciesData, setFrequenciesData] = useState([]);
  const [predictionsData, setPredictionsData] = useState([]);
  const [sortedPredictionsData, setSortedPredictionsData] = useState([]);
  const [orderBy, setOrderBy] = useState('TEMP_DEPTH');
  const dataAuthentication = useSelector((state) => state.authToken);

  const transformGraphUrl = (url) => {
    return url.replace('./static', 'http://localhost:8080/static');
  };

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

        if (data.type === 'MILANKOVIC_CYCLES' && data.result.frequencies_path) {
          const csvUrl = transformGraphUrl(data.result.frequencies_path);
          const response = await fetch(csvUrl);
          const csvText = await response.text();
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
              setFrequenciesData(result.data);
            },
            error: (error) => {
              console.error('Error parsing CSV data:', error);
            },
          });
        }

        if (data.type === 'PREDICTION' && data.result.predictions_path) {
          const csvUrl = transformGraphUrl(data.result.predictions_path);
          const response = await fetch(csvUrl);
          const csvText = await response.text();
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
              setPredictionsData(result.data);
              setSortedPredictionsData(result.data.sort((a, b) => a[orderBy] - b[orderBy]));
            },
            error: (error) => {
              console.error('Error parsing CSV data:', error);
            },
          });
        }
      } catch (error) {
        setError('Error fetching job data');
        console.error('Error fetching job data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [wellId, jobId, dataAuthentication]);

  useEffect(() => {
    setSortedPredictionsData([...predictionsData].sort((a, b) => a[orderBy] - b[orderBy]));
  }, [orderBy, predictionsData]);

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
  }

  if (!jobData) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>No job data available</Typography></Box>;
  }

  const handleOpenModal = (graph) => {
    setSelectedGraph(graph);
  };

  const handleCloseModal = () => {
    setSelectedGraph(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
      {t('jobsDetails.jobDetail')}
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">{t('jobsDetails.jobInformation')}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography><strong>{t('columns.id')}:</strong> {jobData.id}</Typography>
          <Typography><strong>{t('columns.user_id')}:</strong> {jobData.user_id}</Typography>
          <Typography><strong>{t('columns.type')}:</strong> {t(`type.${jobData.type}`)}</Typography>
          <Typography><strong>{t('columns.status')}:</strong> {t(`status.${jobData.status}`)}</Typography>
          <Typography><strong>{t('columns.created_at')}:</strong> {new Date(jobData.created_at).toLocaleString()}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">{t('columns.parameters')}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography><strong>{t('parameters.min_window')}:</strong> {jobData.parameters.min_window}</Typography>
          <Typography><strong>{t('parameters.max_window')}:</strong> {jobData.parameters.max_window}</Typography>
          {jobData.parameters.tolerance !== undefined && (
            <Typography><strong>{t('parameters.tolerance')}:</strong> {jobData.parameters.tolerance}%</Typography>
          )}
          {jobData.parameters.sedimentation_rate !== undefined && (
            <Typography><strong>{t('parameters.sedimentation_rate')}:</strong> {jobData.parameters.sedimentation_rate}</Typography>
          )}
        </CardContent>
      </Card>
      {(jobData.type === 'NEW_WELL' || jobData.type === 'GRAPHS') && (
        <Card>
          <CardContent>
            <Typography variant="h6">{t('jobsDetails.resultGraphs')}</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              {jobData.result.graphs.map((graph, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card onClick={() => handleOpenModal(transformGraphUrl(graph.image))} sx={{ cursor: 'pointer' }}>
                    <CardContent>
                      <Typography variant="subtitle1">{t(`graphs.${graph.title}`)}</Typography> 
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
      )}
      {jobData.type === 'MILANKOVIC_CYCLES' && (
        <Card>
          <CardContent>
            <Typography variant="h6">{t('type.MILANKOVIC_CYCLES')}</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              {Object.entries(jobData.result.cycles).map(([cycleType, cycleData], index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1">{cycleType}</Typography>
                      {cycleData.detected ? (
                        <>
                          <Typography><strong>Period:</strong> {cycleData.details.period}</Typography>
                          <Typography><strong>Amplitude:</strong> {cycleData.details.amplitude}</Typography>
                          <Typography><strong>Error Percentage:</strong> {cycleData.details.error_percentage}</Typography>
                        </>
                      ) : (                    
                        <Typography><strong>{t('jobsDetails.reason')}: </strong>{t(`reason.${cycleData.details.reason}`)}</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
      {jobData.type === 'MILANKOVIC_CYCLES' && frequenciesData.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">{t('parameters.frequenciesGraph')}</Typography>
            <Divider sx={{ my: 2 }} />
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={frequenciesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="frequencies" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amplitudes" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
      {jobData.type === 'PREDICTION' && sortedPredictionsData.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">Predictions Graph</Typography>
            <Divider sx={{ my: 2 }} />
            <RadioGroup
              row
              aria-label="order-by"
              name="order-by"
              value={orderBy}
              onChange={handleOrderByChange}
              sx={{ mb: 2 }}
            >
              <FormControlLabel value="TEMP_DEPTH" control={<Radio />} label="Order by Depth" />
              <FormControlLabel value="OIL_PROBABILITY" control={<Radio />} label="Order by Oil Probability" />
            </RadioGroup>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={sortedPredictionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="TEMP_DEPTH" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="OIL_PROBABILITY" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
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