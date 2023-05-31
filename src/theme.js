import { createTheme } from '@mui/material/styles';

export const themeSettings = () => {
  return createTheme({
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
};
