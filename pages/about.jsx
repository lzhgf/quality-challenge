import React from 'react';
import { Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Sobre
      </Typography>
      <Typography variant="body1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
    </Container>
  );
}
