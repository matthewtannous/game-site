/**
 * Navigation Bar at the top of the screen
 */

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../store/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const links = [
    { to: '/', label: 'Home' },
    { to: '/local', label: 'Local' },
    { to: '/challenges', label: 'Challenges' },
    { to: '/games', label: 'Games' },
    { to: '/about', label: 'About' },
];

const NavBar = () => {
    const { user, signOut } = useAuth();

    const navigate = useNavigate();

    function signOutAndRedirect() {
        signOut();
        navigate('/');
    }

    return (
        <AppBar position="static" sx={{ mb: 3 }}>
            <Toolbar>
                <Typography variant="h6" sx={{ mr: 3 }}>
                    Game Site
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', flexGrow: 1 }}>
                    {/* If client is not null, display these links */}
                    {user ? links.map((link) => (
                        <Button
                            key={link.to}
                            color="inherit"
                            component={NavLink}
                            to={link.to}
                            sx={{ '&.active': { textDecoration: 'underline' } }}
                        >
                            {link.label}
                        </Button>
                    )) :
                        <Button color="inherit" component={NavLink} to="/local"
                            sx={{ '&.active': { textDecoration: 'underline' } }}>
                            Local
                        </Button>}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {user ? (
                        <>
                            <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.85 }}>
                                {user.username}
                            </Typography>
                            <Button color="inherit" onClick={signOutAndRedirect}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={NavLink} to="/login"
                                sx={{ '&.active': { textDecoration: 'underline' } }}>
                                Login
                            </Button>
                            <Button color="inherit" component={NavLink} to="/register"
                                sx={{ '&.active': { textDecoration: 'underline' } }}>
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
