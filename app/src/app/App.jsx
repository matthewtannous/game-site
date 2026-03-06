import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Layout from '../components/layout/Layout';
import { routes, authRoutes } from './routes';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Layout>
        <Routes>
          {user ?
            routes.map(({ path, element: Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))
            : authRoutes.map(({ path, element: Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}

          <Route
            path='*' // Regular expression (any route/url)
            element={<Navigate to={user ? '/' : '/login'} replace />}
          />
        </Routes>
      </Layout>
    </Container>
  );
}

export default App;
