import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Bem vindo ao meu site
      </Typography>
      <Typography variant="body1">
        Lorem ipsum
      </Typography>
    </Container>
  );
};

export default Home;
