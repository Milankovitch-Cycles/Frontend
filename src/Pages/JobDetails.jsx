import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, Divider, CircularProgress, Modal, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';
import { getJobById } from '../api/authService';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, BarChart, Bar } from 'recharts';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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
  const [gammaRayData, setGammaRayData] = useState([]);
  const [graphType, setGraphType] = useState('prediction');
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
              const sortedData = result.data.sort((a, b) => a.TEMP_DEPTH - b.TEMP_DEPTH);
              setPredictionsData(sortedData);
              setSortedPredictionsData(sortedData);
            },
            error: (error) => {
              console.error('Error parsing CSV data:', error);
            },
          });
        }

        if (data.type === 'NEW_WELL' && data.result.gamma_ray_path) {
          const csvUrl = transformGraphUrl(data.result.gamma_ray_path);
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
              setGammaRayData(transformedData);
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

  const calculateTrendLine = (data) => {
    const validData = data.filter(point => point.TEMP_DEPTH != null && point.OIL_PROBABILITY != null);
    const n = validData.length;
    if (n === 0) return [];

    const sumX = validData.reduce((acc, point) => acc + point.TEMP_DEPTH, 0);
    const sumY = validData.reduce((acc, point) => acc + point.OIL_PROBABILITY, 0);
    const sumXY = validData.reduce((acc, point) => acc + point.TEMP_DEPTH * point.OIL_PROBABILITY, 0);
    const sumX2 = validData.reduce((acc, point) => acc + point.TEMP_DEPTH * point.TEMP_DEPTH, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const minX = Math.min(...validData.map(point => point.TEMP_DEPTH));
    const maxX = Math.max(...validData.map(point => point.TEMP_DEPTH));

    return [
      { TEMP_DEPTH: minX, TREND: slope * minX + intercept },
      { TEMP_DEPTH: maxX, TREND: slope * maxX + intercept }
    ];
  };

  const calculateDepthBuckets = (data, bucketSize) => {
    const buckets = {};
    data.forEach(point => {
      const bucket = Math.floor(point.TEMP_DEPTH / bucketSize) * bucketSize;
      if (!buckets[bucket]) {
        buckets[bucket] = { depth: bucket, totalProbability: 0, count: 0 };
      }
      buckets[bucket].totalProbability += point.OIL_PROBABILITY;
      buckets[bucket].count += 1;
    });

    const bucketArray = Object.values(buckets).map(bucket => ({
      depth: bucket.depth,
      averageProbability: bucket.totalProbability / bucket.count,
    })).filter(bucket => !isNaN(bucket.averageProbability));

    return bucketArray.sort((a, b) => b.averageProbability - a.averageProbability);
  };

  const downloadPDF = () => {
    const input = document.getElementById('job-details');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const pageHeight = pdfWidth / ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pageHeight);
      pdf.save("job-details.pdf");
    });
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("graphs");

    for (const graph of jobData.result.graphs) {
      const url = transformGraphUrl(graph.image);
      const response = await fetch(url);
      const blob = await response.blob();
      folder.file(`${graph.title}.png`, blob);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "graphs.zip");
    });
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

  const handleGraphTypeChange = (event) => {
    setGraphType(event.target.value);
  };

  const trendLineData = calculateTrendLine(sortedPredictionsData);
  const depthBucketsData = calculateDepthBuckets(sortedPredictionsData, 100);

  return (
    <Box p={4} id="job-details">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        {jobData.type === 'GRAPHS' ? (
          <IconButton color="primary" onClick={downloadZip}>
            <GetAppIcon />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={downloadPDF}>
            <GetAppIcon />
          </IconButton>
        )}
      </Box>
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
          {jobData.parameters.min_window !== undefined && (
            <Typography><strong>{t('parameters.min_window')}:</strong> {jobData.parameters.min_window}</Typography>
          )}
          {jobData.parameters.max_window !== undefined && (
            <Typography><strong>{t('parameters.max_window')}:</strong> {jobData.parameters.max_window}</Typography>
          )}
          {jobData.parameters.tolerance !== undefined && (
            <Typography><strong>{t('parameters.tolerance')}:</strong> {jobData.parameters.tolerance}%</Typography>
          )}
          {jobData.parameters.sedimentation_rate !== undefined && (
            <Typography><strong>{t('parameters.sedimentation_rate')}:</strong> {jobData.parameters.sedimentation_rate}</Typography>
          )}
          {jobData.parameters.filename && (
            <Typography><strong>{t('parameters.filename')}:</strong> {jobData.parameters.filename}</Typography>
          )}
        </CardContent>
      </Card>
      {jobData.type === 'NEW_WELL' && (
        <Card>
          <CardContent>
            <Typography variant="h6">{t('jobsDetails.resultGraphs')}</Typography>
            <Divider sx={{ my: 2 }} />
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={gammaRayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="TEMP_DEPTH" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="GR" stroke="#8884d8" />
                <Scatter dataKey="GR" fill="red" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
      {jobData.type === 'GRAPHS' && (
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
                      <Typography variant="subtitle1">{t(`jobsDetails.${cycleType}`)}</Typography>
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
        <>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6">{t('jobsDetails.predictionsGraph')}</Typography>
              <Divider sx={{ my: 2 }} />
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={sortedPredictionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="TEMP_DEPTH" />
                  <YAxis />
                  <Tooltip />
                  <Scatter dataKey="OIL_PROBABILITY" fill="red" />
                  <Line type="monotone" dataKey="OIL_PROBABILITY" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6">{t('jobsDetails.trendGraph')}</Typography>
              <Divider sx={{ my: 2 }} />
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={sortedPredictionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="TEMP_DEPTH" />
                  <YAxis />
                  <Tooltip />
                  <Line type="linear" dataKey="TREND" data={trendLineData} stroke="#ff7300" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6">{t('jobsDetails.depthBucketsGraph')}</Typography>
              <Divider sx={{ my: 2 }} />
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={depthBucketsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="depth" tickFormatter={(tick) => `${tick}-${tick + 100}`} />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Bar dataKey="averageProbability" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
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
                {t('jobsDetails.graphsDetails')}
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