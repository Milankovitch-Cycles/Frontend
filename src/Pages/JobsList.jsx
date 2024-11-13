import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobs } from '../api/authService';
import BaseTable from '../components/BaseTable';
import { useSelector } from 'react-redux';
import { Box, Typography, TablePagination } from '@mui/material';

const JobsList = () => {
  const { wellId } = useParams();
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

  useEffect(() => {
    fetchJobs();
  }, [dataAuthentication]);

  const fetchJobs = async (offset = 0, limit = 10) => {
    try {
      if (!dataAuthentication || !dataAuthentication.access_token) {
        console.error("No access token available");
        return;
      }

      const token = dataAuthentication.access_token;
      const data = await getJobs(token, limit, offset);
      setJobs(data[0].jobs);
      setPagination(data[0].pagination);
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
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    );
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'user_id', label: 'User ID' },
    { id: 'type', label: 'Type' },
    { id: 'parameters', label: 'Parameters', render: (job) => renderParameters(job.parameters) },
    { id: 'result', label: 'Result', render: (job) => JSON.stringify(job.result) },
    { id: 'status', label: 'Status' },
    { id: 'created_at', label: 'Created At', render: (job) => new Date(job.created_at).toLocaleString() },
  ];

  const actions = {
    view: (id) => console.log('View', id),
    edit: (id) => console.log('Edit', id),
    delete: (id) => console.log('Delete', id),
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
        Jobs List
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
        labelRowsPerPage="Filas por página"
      />
    </Box>
  );
};

export default JobsList;