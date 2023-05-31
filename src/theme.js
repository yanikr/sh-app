import { createTheme } from '@mui/material/styles';

export const themeSettings = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: '2px black solid',
          color: 'black',
          backgroundColor: '#ee6b38',
          fontSize: '1rem',
          fontWeight: '900',
          letterSpacing: '0.2rem',
          '&:hover': { backgroundColor: '#f4e8ad' },
        },
      },
    },
  },
  typography: {
    fontFamily: ['Coming Soon', 'cursive'].join(','),
    fontSize: 12,
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 16,
    },
    h6: {
      fontSize: 14,
    },
  },
});
