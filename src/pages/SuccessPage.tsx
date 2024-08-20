import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Header />
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Purchase Successful!
      </Typography>
      <Typography variant="body1" style={{ marginTop: '20px' }}>
        Thank you for your purchase.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default SuccessPage;
