import { useContext, useState } from "react";

import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';

import { login } from "../services/auth.service";
import { AuthContext } from "../../../context/AuthContext";

export default function Login() {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const { signIn } = useContext(AuthContext);

    function handleFormChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const { ok, data } = await login(form);
        if (ok) {
            // console.log(data.user);
            signIn(data);
        } else {
            // setError(data || "Incorrect Username or Password");
            setError("Incorrect Username or Password");
        }
    }

    return (
        <Paper sx={{ p: 3, maxWidth: 480 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Login
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
                    Login
                </Button>

                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/register">
                        Register
                    </Link>
                </Typography>
            </Stack>
        </Paper>
    );
}