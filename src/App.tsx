// src/App.tsx  (Continued)
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ClientProvider } from './context/ClientContext';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';
import ClientDetail from './components/clients/ClientDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ErrorPage from './components/shared/ErrorPage';
import Layout from './components/layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Example primary color (adjust as needed)
        },
        secondary: {
            main: '#dc004e', // Example secondary color
        },
    },
});

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
      <ThemeProvider theme={theme}>
    <Router>
      <ClientProvider>
        <Layout>
          <Routes>
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />

            {/* Protected Routes (require authentication) */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                    <Typography variant="h4" align="center" gutterBottom>Welcome!</Typography>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/clients"
              element={isAuthenticated ? <ClientList /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/clients/:id"
              element={isAuthenticated ? <ClientDetail /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/clients/create"
              element={isAuthenticated ? <ClientForm /> : <Navigate to="/login" replace />}
            />
              <Route
                  path="/clients/edit/:id"
                  element={isAuthenticated ? <ClientForm  /> : <Navigate to="/login" replace />}
              />

            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      </ClientProvider>
    </Router>
      </ThemeProvider>
  );
};

export default App;