import Home from '../pages/Home';
import About from '../pages/About';

import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

import LocalPlay from '../pages/LocalPlay';
import LocalTicTacToe from '../features/tic-tac-toe/pages/Local';
import LocalConnect4 from '../features/connect_4/pages/Local'

export const loggedInRoutes = [
    { path: "/", element: Home },
    { path: "/about", element: About },
];

export const authRoutes = [
    { path: "/login", element: Login },
    { path: "/register", element: Register },
];

export const alwaysAvailableRoutes = [
    { path: "/local", element: LocalPlay },
    { path: "/local/tic-tac-toe", element: LocalTicTacToe },
    { path: "/local/connect-4", element: LocalConnect4 },
]