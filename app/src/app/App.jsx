import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Layout from '../components/layout/Layout';
import { loggedInRoutes, authRoutes, alwaysAvailableRoutes } from './routes';

import { useAuth } from '../store/hooks/useAuth';

import RealtimeSync from './RealtimeSync';

function App() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <RealtimeSync />
      <Layout>
        <Routes>
          {
            alwaysAvailableRoutes.map(({ path, element: Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))
          }

          {user ?
            loggedInRoutes.map(({ path, element: Page }) => (
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