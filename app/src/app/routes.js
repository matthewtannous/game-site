import Home from '../pages/Home';
import About from '../pages/About';

import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

import LocalPlay from '../pages/LocalPlay';
import LocalTicTacToe from '../features/tic-tac-toe/pages/Local';
import LocalConnect4 from '../features/connect_4/pages/Local';

import ChallengeList from '../features/challenges/pages/ChallengeList';
import ChallengeForm from '../features/challenges/pages/ChallengeForm';

import OngoingList from '../features/ongoing/pages/OngoingList';

import OnlineConnect4 from '../features/connect_4/pages/Online';
import OnlineTicTacToe from '../features/tic-tac-toe/pages/Online';

export const loggedInRoutes = [
    { path: "/", element: Home },
    { path: "/about", element: About },

    { path: "/challenges", element: ChallengeList },
    { path: "/challenges/new", element: ChallengeForm },

    { path: "/ongoing", element: OngoingList },
    { path: "/ongoing/tic-tac-toe/:id", element: OnlineTicTacToe },
    { path: "/ongoing/connect-4/:id", element: OnlineConnect4 },
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