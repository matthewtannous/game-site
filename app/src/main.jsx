import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles/base.css';
import App from './app/App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
