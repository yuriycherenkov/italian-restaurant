import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#9155FD',
    },
    secondary: {
      main: '#8A8D93',
    },
    error: {
      main: '#FF4C51',
    },
    warning: {
      main: '#FFB400',
    },
    info: {
      main: '#16B1FF',
    },
    success: {
      main: '#56CA00',
    },
    text: {
      primary: 'rgba(58, 53, 65, 0.87)',
      secondary: 'rgba(58, 53, 65, 0.68)',
      disabled: 'rgba(58, 53, 65, 0.38)',
    },
    background: {
      default: 'rgba(244, 245, 250, 1)',
      paper: 'rgba(255, 255, 255, 1)',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
