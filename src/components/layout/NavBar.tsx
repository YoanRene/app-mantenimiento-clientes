// src/components/layout/Navbar.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login';
    }


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Client Management
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/clients">Clients</Button>
        {isAuthenticated ? (
           <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;