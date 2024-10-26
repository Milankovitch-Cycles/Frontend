import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadWell from "../LoadWell/LoadWell";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWells } from "../../api/authService";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const ListWells = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [wells, setWells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wellsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [openModal, setOpenModal] = useState(false);
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    async function loadWells() {
      const token = dataAuthentication.access_token;
      try {
        const result = await getWells(
          token,
          wellsPerPage,
          (currentPage - 1) * wellsPerPage
        );
        console.log(result);
        setWells(result || []);
      } catch (error) {
        console.error("Error loading wells:", error);
      }
    }
    loadWells();
  }, [currentPage, dataAuthentication.access_token, wellsPerPage]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedWells = [...wells].sort((a, b) => {
    if (orderBy === "dateCreated") {
      return sortDirection === "asc"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at);
    }

    if (a[orderBy] < b[orderBy]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleViewWell = (wellId) => {
    navigate(`/well/${wellId}`);
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Typography variant="h4" color="text.primary" mb={4}>
        Pozos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{
          mb: 2,
          backgroundColor: "#1a73e8",
          "&:hover": { backgroundColor: "#0d47a1" },
        }}
        onClick={handleOpenModal}
      >
        Agregar Pozo
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 600,
            width: "100%",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            Agregar Nuevo Pozo
          </Typography>
          <LoadWell />
        </Box>
      </Modal>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.primary" }}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? sortDirection : "asc"}
                  onClick={() => handleSort("name")}
                  sx={{ color: "text.primary" }}
                >
                  Nombre
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>Archivo LAS</TableCell>
              <TableCell sx={{ color: "text.primary" }}>
                <TableSortLabel
                  active={orderBy === "description"}
                  direction={orderBy === "description" ? sortDirection : "asc"}
                  onClick={() => handleSort("description")}
                  sx={{ color: "text.primary" }}
                >
                  Descripción
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? sortDirection : "asc"}
                  onClick={() => handleSort("status")}
                  sx={{ color: "text.primary" }}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>
                <TableSortLabel
                  active={orderBy === "dateCreated"}
                  direction={orderBy === "dateCreated" ? sortDirection : "asc"}
                  onClick={() => handleSort("dateCreated")}
                  sx={{ color: "text.primary" }}
                >
                  Fecha Creación
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "text.primary" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedWells.length > 0 ? (
              sortedWells.map((well) => (
                <TableRow
                  key={well.id}
                  hover
                  onClick={() => handleViewWell(well.id)}
                >
                  <TableCell sx={{ color: "text.primary" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={well.image}
                        sx={{ width: 36, height: 36, marginRight: 1 }}
                      />
                      <Typography color="text.primary">{well.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "text.primary" }}>
                    <Typography>{well.filename}</Typography>
                  </TableCell>
                  <TableCell sx={{ color: "text.primary" }}>
                    <Typography>{well.description}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: well.status === "Active" ? "green" : "red",
                    }}
                  >
                    <Typography>{well.status}</Typography>
                  </TableCell>
                  <TableCell sx={{ color: "text.primary" }}>
                    <Typography>
                      {new Date(well.created_at).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "text.primary" }}>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewWell(well.id);
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="secondary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{ color: "text.primary", textAlign: "center" }}
                >
                  No hay pozos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          width: "100%",
        }}
      >
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBackIcon sx={{ color: "text.primary" }} />
        </IconButton>
        <IconButton onClick={handleNextPage}>
          <ArrowForwardIcon sx={{ color: "text.primary" }} />
        </IconButton>
      </Box>
    </div>
  );
};

export default ListWells;
