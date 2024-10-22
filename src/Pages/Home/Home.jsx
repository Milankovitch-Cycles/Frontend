import React, { useEffect, useState } from 'react';  
import { Navbar } from '../../components';
import { Typography, Button, Box, Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { getWells } from '../../api/authService';

const Home = () => {
  const navigate = useNavigate(); // Crea la instancia de navigate
  const [wells, setWells] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [wellsPerPage] = useState(5); 
  const [sortDirection, setSortDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('fantasyName');
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    async function loadWells() {
      const token = dataAuthentication.access_token;
      try {
        const result = await getWells(token, wellsPerPage, (currentPage - 1) * wellsPerPage);
        setWells(result || []); 
      } catch (error) {
        console.error('Error loading wells:', error);
      }
    }
    loadWells();
  }, [currentPage, dataAuthentication.access_token, wellsPerPage]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedWells = [...wells].sort((a, b) => {
    if (orderBy === 'dateCreated') {
      return sortDirection === 'asc'
        ? new Date(a.dateCreated) - new Date(b.dateCreated)
        : new Date(b.dateCreated) - new Date(a.dateCreated);
    }
    
    if (a[orderBy] < b[orderBy]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <Typography variant="h4" color="black" mb={4}>
          Lista de Pozos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ mb: 2, backgroundColor: '#1a73e8', '&:hover': { backgroundColor: '#0d47a1' } }}
          onClick={() => navigate('/loadWell')} // Navega a la ruta
        >
          Agregar Pozo
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'black' }}>
                  <TableSortLabel
                    active={orderBy === 'fantasyName'}
                    direction={orderBy === 'fantasyName' ? sortDirection : 'asc'}
                    onClick={() => handleSort('fantasyName')}
                    sx={{ color: 'black' }}
                  >
                    Nombre
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'black' }}>
                  <TableSortLabel
                    active={orderBy === 'lasFileName'}
                    direction={orderBy === 'lasFileName' ? sortDirection : 'asc'}
                    onClick={() => handleSort('lasFileName')}
                    sx={{ color: 'black' }}
                  >
                    Archivo LAS
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'black' }}>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? sortDirection : 'asc'}
                    onClick={() => handleSort('description')}
                    sx={{ color: 'black' }}
                  >
                    Descripción
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'black' }}>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? sortDirection : 'asc'}
                    onClick={() => handleSort('status')}
                    sx={{ color: 'black' }}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'black' }}>
                  <TableSortLabel
                    active={orderBy === 'dateCreated'}
                    direction={orderBy === 'dateCreated' ? sortDirection : 'asc'}
                    onClick={() => handleSort('dateCreated')}
                    sx={{ color: 'black' }}
                  >
                    Fecha Creación
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'black' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedWells.length > 0 ? (
                sortedWells.map((well) => (
                  <TableRow key={well.id}>
                    <TableCell sx={{ color: 'black' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={well.image} sx={{ width: 36, height: 36, marginRight: 1 }} />
                        <Typography color="black">{well.fantasyName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      <Typography>{well.lasFileName}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      <Typography>{well.description}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: well.status === 'Active' ? 'green' : 'red' }}>
                      <Typography>{well.status}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      <Typography>{well.dateCreated}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'black' }}>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton color="primary" onClick={() => console.log(`View ${well.id}`)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => console.log(`Edit ${well.id}`)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" onClick={() => console.log(`Delete ${well.id}`)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ color: 'black', textAlign: 'center' }}>
                    No hay pozos disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, width: '100%' }}>
          <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ArrowBackIcon sx={{ color: 'black' }} />
          </IconButton>
          <IconButton onClick={handleNextPage}>
            <ArrowForwardIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>
      </div>
    </>
  );
};

export default Home;
