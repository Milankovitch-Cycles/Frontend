import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, Card, CardContent } from "@mui/material";
import { getWellById } from "../api/authService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const WellDetails = () => {
  const wellId = useParams().wellId;
  const [well, setWell] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);

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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWell();
  }, [wellId, dataAuthentication]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!well) {
    return <Typography>No well data found</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {well.name}
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Descripción:</strong> {well.description}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Archivo LAS:</strong> {well.filename}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Metadata:</strong> {well.well_metadata}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Status:</strong> {well.status}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            <strong>Fecha de Creación:</strong> {new Date(well.created_at).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WellDetails;