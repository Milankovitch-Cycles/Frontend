import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobs } from '../api/authService';
import BaseTable from '../components/BaseTable';
import { useSelector } from 'react-redux';

const JobsList = () => {
  const { wellId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('created_at');
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {


    const fetchJobs = async () => {

      try {
        if (!dataAuthentication || !dataAuthentication.access_token) {
          console.error("No access token available");
          return;
        }

        const token = dataAuthentication.access_token;
        const data = await getJobs(token);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [dataAuthentication]);

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