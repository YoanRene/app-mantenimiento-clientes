// src/components/auth/Login.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Replace with actual authentication logic (e.g., API call)
    if (username === 'admin' && password === 'password') {
      // Simulate successful login
      localStorage.setItem('isAuthenticated', 'true'); // Store authentication status
      window.location.href = '/'; // Redirect to home page
    } else {
       setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;