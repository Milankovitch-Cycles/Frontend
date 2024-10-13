import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import { Typography, Button, Box, Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from MUI
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [wells, setWells] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockedWells = [
      {
        id: 1,
        fantasyName: 'Well A',
        lasFileName: 'well_a.las',
        description: 'Description for Well A',
        status: 'Active',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-01-01'
      },
      {
        id: 2,
        fantasyName: 'Well B',
        lasFileName: 'well_b.las',
        description: 'Description for Well B',
        status: 'Inactive',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-02-01'
      },
      {
        id: 3,
        fantasyName: 'Well C',
        lasFileName: 'well_c.las',
        description: 'Description for Well C',
        status: 'Active',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-03-01'
      },
      {
        id: 4,
        fantasyName: 'Well D',
        lasFileName: 'well_d.las',
        description: 'Description for Well D',
        status: 'Inactive',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-04-01'
      },
      {
        id: 5,
        fantasyName: 'Well E',
        lasFileName: 'well_e.las',
        description: 'Description for Well E',
        status: 'Active',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-05-01'
      },
      {
        id: 6,
        fantasyName: 'Well F',
        lasFileName: 'well_f.las',
        description: 'Description for Well F',
        status: 'Inactive',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-06-01'
      },
      {
        id: 7,
        fantasyName: 'Well G',
        lasFileName: 'well_g.las',
        description: 'Description for Well G',
        status: 'Active',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-07-01'
      },
      {
        id: 8,
        fantasyName: 'Well H',
        lasFileName: 'well_h.las',
        description: 'Description for Well H',
        status: 'Inactive',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-08-01'
      },
      {
        id: 9,
        fantasyName: 'Well I',
        lasFileName: 'well_i.las',
        description: 'Description for Well I',
        status: 'Active',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-09-01'
      },
      {
        id: 10,
        fantasyName: 'Well J',
        lasFileName: 'well_j.las',
        description: 'Description for Well J',
        status: 'Inactive',
        image: 'https://via.placeholder.com/150',
        dateCreated: '2023-10-01'
      }
    ];
    setWells(mockedWells);
  }, []);

  const handleLoadWellClick = () => {
    navigate('/loadWell');
  };

  const handleViewDetails = (id) => {
    navigate(`/well/${id}`);
  };

  const handleEditWell = (id) => {
    navigate(`/editWell/${id}`);
  };

  const handleDeleteWell = (id) => {
    setWells((prevWells) => prevWells.filter((well) => well.id !== id));
  };

  const columns = [
    {
      field: 'image',
      headerName: '',
      width: 100,
      renderCell: (params) => <Avatar alt={params.row.fantasyName} src={params.value} />
    },
    { field: 'fantasyName', headerName: 'Fantasy Name', width: 150 },
    { field: 'lasFileName', headerName: 'LAS File Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'dateCreated', headerName: 'Date Created', width: 150 },
    {
      field: 'view',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleViewDetails(params.row.id)}>
          <VisibilityIcon />
        </IconButton>
      )
    },
    {
      field: 'edit',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEditWell(params.row.id)}>
          <EditIcon />
        </IconButton>
      )
    },
    {
      field: 'delete',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => handleDeleteWell(params.row.id)}>
          <DeleteIcon style={{ color: 'red' }} />
        </IconButton>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2} pr={2}>
        <Typography variant="h3" component="h1" gutterBottom style={{ marginLeft: '16px' }}>
          Wells
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleLoadWellClick}
          style={{ marginRight: '16px' }} 
        >
          Load Well
        </Button>
      </Box>
      <div style={{ flexGrow: 1 }}>
        <DataGrid rows={wells} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default Home;