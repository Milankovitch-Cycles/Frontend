import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import { Typography, Button, Box, Avatar, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { getWells } from '../../api/authService';

const Home = () => {
  const [wells, setWells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wellsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('fantasyName');
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    async function loadWells() {
      const token = dataAuthentication.access_token;
      const wells = await getWells(token, wellsPerPage, (currentPage - 1) * wellsPerPage);
      setWells(wells);
    }
    loadWells();
  }, []);

  // Ordenar datos
  const handleSort = (property) => {
    const isAsc = orderBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Función para ordenar los pozos
  const sortedWells = [...wells].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Calcular el índice del primer y último pozo en la página actual
  const indexOfLastWell = currentPage * wellsPerPage;
  const indexOfFirstWell = indexOfLastWell - wellsPerPage;
  const currentWells = sortedWells.slice(indexOfFirstWell, indexOfLastWell);

  // Cambiar de página
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#121212', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <Typography variant="h4" color="white" mb={4}>
          Lista de Pozos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ mb: 2, backgroundColor: '#1a73e8', '&:hover': { backgroundColor: '#0d47a1' } }}
        >
          Agregar Pozo
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>
                  <TableSortLabel
                    active={orderBy === 'fantasyName'}
                    direction={orderBy === 'fantasyName' ? sortDirection : 'asc'}
                    onClick={() => handleSort('fantasyName')}
                    sx={{ color: 'inherit' }}
                  >
                    Nombre
                  </TableSortLabel>
                </TableCell>

                <TableCell sx={{ color: 'white' }}>
                  <TableSortLabel
                    active={orderBy === 'lasFileName'}
                    direction={orderBy === 'lasFileName' ? sortDirection : 'asc'}
                    onClick={() => handleSort('lasFileName')}
                    sx={{ color: 'white' }}
                  >
                    Archivo LAS
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? sortDirection : 'asc'}
                    onClick={() => handleSort('description')}
                    sx={{ color: 'white' }}
                  >
                    Descripción
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Fecha Creación</TableCell>
                <TableCell sx={{ color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentWells.map((well) => (
                <TableRow key={well.id}>
                  <TableCell sx={{ color: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={well.image} sx={{ width: 36, height: 36, marginRight: 1 }} />
                      <Typography color="white">{well.fantasyName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <Typography>{well.lasFileName}</Typography>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <Typography>{well.description}</Typography>
                  </TableCell>
                  <TableCell sx={{ color: well.status === 'Active' ? 'green' : 'red' }}>
                    <Typography>{well.status}</Typography>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <Typography>{well.dateCreated}</Typography>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(wells.length / wellsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          sx={{ marginTop: 2 }}
        />
      </div>
    </>
  );
};

export default Home;
