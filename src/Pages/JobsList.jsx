import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getJobs } from '../api/authService';
import BaseTable from '../components/BaseTable';
import { useSelector } from 'react-redux';
import { Box, Typography, TablePagination } from '@mui/material';
import BaseInput from "../components/BaseInput";

const JobsList = () => {
  const { t, i18n } = useTranslation(); // Access the i18n object
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    total: 0,
    total_pages: 0,
  });
  const [sortDirection, setSortDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const dataAuthentication = useSelector((state) => state.authToken);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs(); // Re-fetch jobs whenever language changes or dataAuthentication changes
  }, [i18n.language, dataAuthentication]);

  const translateJobData = (job) => ({
    ...job,
    type: t(`type.${job.type}`),
    status: t(`status.${job.status}`, job.status),
  });

  const fetchJobs = async (offset = 0, limit = 10) => {
    try {
      if (!dataAuthentication || !dataAuthentication.access_token) {
        console.error("No access token available");
        return;
      }

      const token = dataAuthentication.access_token;
      const data = await getJobs(token, limit, offset);
      const translatedJobs = data.jobs.map(translateJobData);
      setJobs(translatedJobs);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);

    const sortedData = jobs.sort((a, b) => {
      if (a[columnId] < b[columnId]) {
        return isAsc ? -1 : 1;
      }
      if (a[columnId] > b[columnId]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    setJobs([...sortedData]);
  };

  const renderParameters = (parameters) => {
    return (
      <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
        {Object.entries(parameters).map(([key, value]) => (
          <li key={key}>
            <strong>{t(`parameters.${key}`, key)}:</strong> {value}
          </li>
        ))}
      </ul>
    );
  };

  const columns = [
    { id: 'id', label: t('columns.id', 'ID') },
    { id: 'user_id', label: t('columns.user_id', 'ID de Usuario') },
    { id: 'type', label: t('columns.type', 'Tipo') },
    { id: 'parameters', label: t('columns.parameters', 'Parámetros'), render: (job) => renderParameters(job.parameters) },
    { id: 'status', label: t('columns.status', 'Estado') },
    { id: 'created_at', label: t('columns.created_at', 'Fecha de Creación'), render: (job) => new Date(job.created_at).toLocaleString() },
  ];

  const actions = {
    view: (id) => {
      const job = jobs.find(job => job.id === id);
      if (job) {
        navigate(`/wells/${job.well_id}/jobs/${job.id}`);
      }
    },
  };

  const handleChangePage = (event, newPage) => {
    const newOffset = newPage * pagination.limit;
    fetchJobs(newOffset, pagination.limit);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setPagination((prev) => ({ ...prev, limit: newLimit }));
    fetchJobs(0, newLimit);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {t('jobsList.title', 'Procesamientos')}
      </Typography>
      <BaseTable
        data={jobs}
        columns={columns}
        onSort={handleSort}
        sortDirection={sortDirection}
        orderBy={orderBy}
        actions={actions}
      />
      <TablePagination
        component="div"
        count={pagination.total}
        page={Math.floor(pagination.offset / pagination.limit)}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t('pagination.rowsPerPage', 'Filas por página')}
      />
    </Box>
  );
};

export default JobsList;
