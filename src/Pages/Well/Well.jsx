import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Avatar, Grid } from '@mui/material';
import { Navbar } from '../../components';

const Well = () => {
  const { wellId } = useParams();
  const [well, setWell] = useState(null);

  useEffect(() => {
    const mockedWells = [
      {
        id: 1,
        fantasyName: 'Well A',
        lasFileName: 'well_a.las',
        description: 'Description for Well A',
        status: 'Active',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-01-01',
        plotImages: [
          'https://via.placeholder.com/600x400?text=Plot+1',
          'https://via.placeholder.com/600x400?text=Plot+2'
        ]
      },
    ];

    const selectedWell = mockedWells.find((well) => well.id === parseInt(wellId));
    setWell(selectedWell);
  }, [wellId]);

  if (!well) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Navbar />
      <Box p={2}>
        <Typography variant="h3" gutterBottom>
          {well.fantasyName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Avatar alt={well.fantasyName} src={well.image} style={{ width: 150, height: 150 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>LAS File Name:</strong> {well.lasFileName}</Typography>
            <Typography variant="body1"><strong>Description:</strong> {well.description}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {well.status}</Typography>
            <Typography variant="body1"><strong>Date Created:</strong> {well.dateCreated}</Typography>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Plots
          </Typography>
          <Grid container spacing={2}>
            {well.plotImages.map((image, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <img src={image} alt={`Plot ${index + 1}`} style={{ width: '100%' }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Well;