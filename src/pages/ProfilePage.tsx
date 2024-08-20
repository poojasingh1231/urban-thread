import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ProfilePage: React.FC = () => {
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!username) {
    return (
      <Container>
        <Typography variant="h4">You are not logged in.</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Profile
      </Typography>
      <Typography variant="body1" style={{ marginTop: '10px' }}>
        Username: {username}
      </Typography>
      <Button variant="contained" color="secondary" style={{ marginTop: '20px' }} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default ProfilePage;
