import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWellJobs } from '../api/authService';
import BaseTable from '../components/BaseTable';

const JobsList = () => {
  const { wellId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('created_at');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getWellJobs(wellId);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [wellId]);

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

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'user_id', label: 'User ID' },
    { id: 'type', label: 'Type' },
    { id: 'parameters', label: 'Parameters', render: (job) => JSON.stringify(job.parameters) },
    { id: 'result', label: 'Result', render: (job) => JSON.stringify(job.result) },
    { id: 'status', label: 'Status' },
    { id: 'created_at', label: 'Created At', render: (job) => new Date(job.created_at).toLocaleString() },
  ];

  const actions = {
    view: (id) => console.log('View', id),
    edit: (id) => console.log('Edit', id),
    delete: (id) => console.log('Delete', id),
  };

  return (
    <div>
      <h1>Jobs List</h1>
      <BaseTable
        data={jobs}
        columns={columns}
        onSort={handleSort}
        sortDirection={sortDirection}
        orderBy={orderBy}
        actions={actions}
      />
    </div>
  );
};

export default JobsList;