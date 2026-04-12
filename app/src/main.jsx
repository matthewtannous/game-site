import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './app/App';

import { Provider } from 'react-redux';
import { store } from './store/index';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e5aa8',
      light: '#4a7fc4',
      dark: '#163f75',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0f766e',
      light: '#3f9c96',
      dark: '#0a4f4a',
      contrastText: '#fff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </ThemeProvider>
);