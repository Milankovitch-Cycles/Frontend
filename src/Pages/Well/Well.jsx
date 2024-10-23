import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useParams, useNavigate } from 'react-router-dom';
import { getWellById } from '../../api/authService';
import { useSelector } from 'react-redux';

const WellDetails = () => {
  const { wellId } = useParams(); // Obtiene el wellId desde la URL
  const navigate = useNavigate(); 
  const [wellData, setWellData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    async function fetchWellData() {
      try {
        setLoading(true); // Empieza a cargar
        const result = await getWellById(dataAuthentication, wellId);
        console.log("los resultados son", result);
        if (result) {
          console.log("entro aca");
          setWellData(result);
        } else {
          setError('No se encontraron detalles del pozo.');
        }
      } catch (error) {
        setError('Error al cargar los detalles del pozo.');
        console.error('Error fetching well data:', error);
      } finally {
        setLoading(false); 
      }
    }
    fetchWellData();
  }, [wellId]);

  const handleGoBack = () => {
    navigate('/home'); 
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>; 
  }

  const formattedDate = format(new Date(wellData.created_at), 'dd/MM/yyyy', { locale: es });

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-black to-gray-900 min-h-screen flex items-center justify-center">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={4}
          sx={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#121212', 
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            border: '1px solid #282828', 
          }}
        >
          <Card sx={{ backgroundColor: '#181818', width: '100%', marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="white">
                {wellData.fantasyName}
              </Typography>
              <Typography variant="body2" color="gray">
                Descripción: {wellData.description}
              </Typography>
              <Typography variant="body2" color="gray">
                Estado: {wellData.status}
              </Typography>
              <Typography variant="body2" color="gray">
                Fecha de creación: {formattedDate}
              </Typography>
            </CardContent>
          </Card>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Volver
          </Button>
        </Box>
      </div>
    </>
  );
};

export default WellDetails;
