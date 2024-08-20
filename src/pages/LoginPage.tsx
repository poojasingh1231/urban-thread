import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);  // State to handle error messages
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // Clear any previous errors
    if (username && password) {
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(login({ username, token: data.token }));
          navigate('/');
        } else {
          setError('Invalid username or password. Please try again.'); // Set error message
        }
      } catch (error) {
        setError('An error occurred during login. Please try again later.');
        console.error('Login error:', error);
      }
    } else {
      setError('Username and password are required.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Login
      </Typography>
      {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}  {/* Display error message */}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        style={{ marginTop: '20px' }}
      >
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
