// src/components/shared/ErrorPage.tsx
import React from 'react';
import { Typography, Container } from '@mui/material';

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography align="center">
        The page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default ErrorPage;