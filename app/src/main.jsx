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
        },
        secondary: {
            main: '#0f766e',
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