import React, { useEffect, useState } from "react";
import { Typography, Button, Modal, Box, IconButton, TablePagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { getWells } from "../api/authService";
import { deleteWell } from "../api/authService";
import BaseTable from "../components/BaseTable";
import BaseInput from "../components/BaseInput";
import LoadWell from "../components/LoadWell";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const ListWells = () => {
  const [wells, setWells] = useState([]);
  const [filteredWells, setFilteredWells] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 5,
    offset: 0,
    total: 0,
    previous_offset: 0,
    next_offset: 0,
    total_pages: 0,
  });
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState("");
  const dataAuthentication = useSelector((state) => state.authToken);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadWells() {
      if (!dataAuthentication || !dataAuthentication.access_token) return;
      const token = dataAuthentication.access_token;
      try {
        const result = await getWells(token, pagination.limit, pagination.offset);
        setWells(result.wells || []);
        setPagination(result.pagination || {});
      } catch (error) {
        console.error("Error loading wells:", error);
      }
    }
    loadWells();
  }, [pagination.offset, dataAuthentication, pagination.limit]);

  useEffect(() => {
    if (filter) {
      setFilteredWells(wells.filter(well => well.name.toLowerCase().includes(filter.toLowerCase())));
    } else {
      setFilteredWells(wells);
    }
  }, [filter, wells]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPagination((prev) => ({
      ...prev,
      offset: newPage * prev.limit,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      offset: 0,
    }));
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => { setOpenModal(false); reloadWells(); }

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
        <Typography>{new Date(well.created_at).toLocaleDateString()}</Typography>
      ),
    },
  ];

  const deleteWellAction = async (id) => {
    if (!dataAuthentication || !dataAuthentication.access_token) return;
    const token = dataAuthentication.access_token;

    const result = await swal.fire({
      title: "¿Estás seguro de querer eliminar este pozo?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteWell(token, id);
        const result = await getWells(token, pagination.limit, pagination.offset);
        setWells(result.wells || []);
        setPagination(result.pagination || {});
      } catch (error) {
        console.error("Error deleting well:", error);
        swal.fire("Error", "Hubo un problema al eliminar el pozo.", "error");
      }
    }
  };

  const actions = {
    view: (id) => navigate(`/wells/${id}`),
    edit: (id) => console.log("Edit", id),
    delete: deleteWellAction,
    jobs: (id) => navigate(`/wells/${id}/jobs`),
  };

  const handleRowClick = (id) => actions.view(id);

  const reloadWells = () => {
    async function loadWells() {
      if (!dataAuthentication || !dataAuthentication.access_token) return;
      const token = dataAuthentication.access_token;
      try {
        const result = await getWells(token, pagination.limit, pagination.offset);
        setWells(result.wells || []);
        setPagination(result.pagination || {});
      } catch (error) {
        console.error("Error loading wells:", error);
      }
    }
    loadWells();
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="mb-4 text-2xl">Pozos</h1>
      <div className="flex justify-evenly">
        <BaseInput
          type="text"
          placeholder="Filtrar por nombre"
          onChange={(e) => setFilter(e.target.value)} 
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
          <LoadWell closeModal={handleCloseModal} reloadWells={reloadWells} />
        </Box>
      </Modal>

      <BaseTable
        data={filteredWells} 
        columns={columns}
        onSort={handleSort}
        sortDirection={sortDirection}
        orderBy={orderBy}
        actions={actions}
        onRowClick={handleRowClick}
      />
      <TablePagination
        component="div"
        count={pagination.total}
        page={Math.floor(pagination.offset / pagination.limit)}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
    </div>
  );
};

export default ListWells;
