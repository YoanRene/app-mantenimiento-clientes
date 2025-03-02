// src/components/Home.tsx

import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Home: React.FC = () => {

  return (
    <Container>
        <Typography variant='h2' align='center' sx={{mb:3}}>Welcome!</Typography>
        <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/clients"
            startIcon={<PeopleAltIcon />}
        >
             Client Accounts
        </Button>
    </Container>
  )
}

export default Home;