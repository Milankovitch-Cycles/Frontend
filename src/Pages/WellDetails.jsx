import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, Card, CardContent, Grid, Modal, IconButton } from "@mui/material";
import { getWellById } from "../api/authService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Scatter } from 'recharts';
import Papa from 'papaparse';
import { useTranslation } from 'react-i18next';

const WellDetails = () => {
  const { t } = useTranslation(); // Importar la función de traducción
  const wellId = useParams().wellId;
  const [well, setWell] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [gammaRayData, setGammaRayData] = useState([]);
  const dataAuthentication = useSelector((state) => state.authToken);

  const transformCsvUrl = (url) => {
    return url.replace('./static', 'http://localhost:8080/static');
  };

  useEffect(() => {
    async function fetchWell() {
      if (!dataAuthentication || !dataAuthentication.access_token) {
        console.error("No access token available");
        return;
      }

      const token = dataAuthentication.access_token;
      try {
        console.log("Fetching well with id:", wellId);
        const result = await getWellById(token, wellId);
        setWell(result);

        if (result.jobs && result.jobs[0].result.gamma_ray_path) {
          const csvUrl = transformCsvUrl(result.jobs[0].result.gamma_ray_path);
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
              setError('Error parsing CSV data');
            },
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWell();
  }, [wellId, dataAuthentication]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!well) {
    return <Typography>No well data found</Typography>;
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
        {well.name}
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>{t('wellDetails.description')}:</strong> {well.description}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>{t('wellDetails.fileLas')}:</strong> {well.filename}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Metadata:</strong>{" "}
            {well.well_metadata ? well.well_metadata : (
              <div>
                <p><strong>{t('wellDetails.depthRange')}:</strong> 3600 a 4600</p>
                <p><strong>{t('wellDetails.frequencyRange')}:</strong> 0 a 800</p>
                <p><strong>{t('wellDetails.massDensityRange')}:</strong> 2.0 a 3.0</p>
                <p><strong>{t('wellDetails.gammaRayRange')}:</strong> 0 a 300</p>
                <p><strong>{t('wellDetails.neutronPorosityRange')}:</strong> 0 a 140</p>
              </div>
            )}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>{t('columns.created_at')}:</strong> {new Date(well.created_at).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h5" gutterBottom>
        {t('wellDetails.processingGraphs')}
      </Typography>
      <Box mb={2}>
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
      </Box>
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
                {t('wellDetails.graphsDetails')}
              </Typography>
              <Box
                component="img"
                src={"http://localhost:8080/" + transformCsvUrl(selectedGraph)}
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

export default WellDetails;