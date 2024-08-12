import React from 'react';
import { CssBaseline, Box, Toolbar, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import '../styles/globals.css';
import theme from '../theme/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header />
          <SideMenu />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
          >
            <Toolbar />
            <Component {...pageProps} />
          </Box>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
