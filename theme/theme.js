// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0F3460', // Cor principal (geralmente utilizada em botões, links, etc.)
    },
    secondary: {
      main: '#E94560', // Cor secundária (usada para elementos menos importantes, como botões secundários)
    },
    background: {
      default: '#fff', // Fundo principal da aplicação
      paper: '#fff', // Fundo de elementos como cards, modais, etc.
    },
    text: {
      primary: '#0F3460', // Cor do texto principal
      secondary: '#0F3460', // Cor do texto secundário
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      color: '#FFFFFF',
    },
    h6: {
      color: '#0F3460',
    },
    body1: {
      color: '#1a1a1a',
    },
    button: {
      color: '#FFFFFF', // Cor do texto dentro de botões
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Texto dos botões
          backgroundColor: '#E94560', // Fundo dos botões
          '&:hover': {
            backgroundColor: '#E84550', // Cor no hover dos botões
          },
        },
      },
    },
  },
});

export default theme;
