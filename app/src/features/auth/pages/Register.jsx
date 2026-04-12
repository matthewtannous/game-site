import { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { register } from '../services/auth.service';

import { useAuth } from '../../../store/hooks/useAuth';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { signIn } = useAuth();

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const { ok, data } = await register(form);
    if (ok) {
      signIn(data);
    } else {
      setError(data || 'Registration Error');
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper sx={{ p: 3, width: 500 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>

        <Stack component="form" spacing={2} onSubmit={handleFormSubmit}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleFormChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleFormChange}
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleFormChange}
            required
            fullWidth
          />

          {error && <Alert severity="error">{error}</Alert>}

          <Button type="submit" variant="contained">
            Register
          </Button>

          <Typography variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
