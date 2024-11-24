import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, CircularProgress } from '@mui/material';
import { getUserDetails } from '../api/authService';
import { useSelector } from 'react-redux';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!dataAuthentication || !dataAuthentication.access_token) {
          console.error("No access token available");
          return;
        }

        const token = dataAuthentication.access_token;
        const userDetails = await getUserDetails(token);
        setUser(userDetails);
      } catch (error) {
        setError('Error fetching user details');
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [dataAuthentication]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
  }

  if (!user) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>No user data available</Typography></Box>;
  }

  const firstName = user.first_name || 'First Name';
  const lastName = user.last_name || 'Last Name';

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Account
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar alt={firstName} src={user.pic} sx={{ width: 100, height: 100, mr: 2 }} />
        <Box>
          <Typography variant="h6">{firstName} {lastName}</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;