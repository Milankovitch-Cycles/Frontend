import React, { useEffect, useState } from "react";
import { Typography, Button, Modal, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWells } from "../../api/authService";
import { BaseTable } from "../../components/BaseTable";
import { BaseInput } from "../../components/BaseInput";
import LoadWell from "../LoadWell/LoadWell";

const ListWells = () => {
  const navigate = useNavigate();
  const [wells, setWells] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wellsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [openModal, setOpenModal] = useState(false);
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    async function loadWells() {
      // Asegúrate de que el token existe antes de hacer la llamada a la API
      if (!dataAuthentication || !dataAuthentication.access_token) {
        console.error("No access token available");
        return;
      }

      const token = dataAuthentication.access_token;
      try {
        const result = await getWells(
          token,
          wellsPerPage,
          (currentPage - 1) * wellsPerPage
        );
        setWells(result || []);
      } catch (error) {
        console.error("Error loading wells:", error);
      }
    }
    loadWells();
  }, [currentPage, dataAuthentication, wellsPerPage]); // Aquí puedes dejar dataAuthentication

  const handleSort = (property) => {
    const isAsc = orderBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleViewWell = (wellId) => navigate(`/well/${wellId}`);

  const columns = [
    {
      id: "name",
      label: "Nombre",
      render: (well) => <Typography>{well.name}</Typography>,
    },
    { id: "filename", label: "Archivo LAS" },
    { id: "description", label: "Descripción" },
    {
      id: "status",
      label: "Status",
      render: (well) => (
        <Typography color={well.status === "Active" ? "green" : "red"}>
          {well.status}
        </Typography>
      ),
    },
    {
      id: "dateCreated",
      label: "Fecha Creación",
      render: (well) => (
        <Typography>
          {new Date(well.created_at).toLocaleDateString()}
        </Typography>
      ),
    },
  ];

  const actions = {
    view: handleViewWell,
    edit: (id) => console.log("Edit", id),
    delete: (id) => console.log("Delete", id),
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="mb-4 text-2xl">Pozos</h1>
      <div className="flex justify-evenly">
        <BaseInput
          type="email"
          placeholder="Cambiar por un filter"
          onChange={() => {}}
        />
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
      </div>
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

      <BaseTable
        data={wells}
        columns={columns}
        onSort={handleSort}
        sortDirection={sortDirection}
        orderBy={orderBy}
        actions={actions}
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={handleNextPage}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default ListWells;
