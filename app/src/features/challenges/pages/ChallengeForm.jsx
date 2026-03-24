/**
 * IDEA:
 * a dynamic list that shows all users at the start, but as the user enters
 * characters in the search bar, only the names that match remain.
 * When the user clicks on a name, the search bar auto-completes with the name
 * 
 * Also add a selection for game type
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../../../store/hooks/useAuth';

import { getUsersExcept } from '../../users/services/users.service';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';

/*
Since we only need one function to get all games and we will not use it anywhere else in the app,
import api directly here to avoid creating a service file that will only be used here
*/
import { api } from '../../../services/api';

function getGames() {
    return api('/games');
}

export default function ChallengeForm() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: "", gameType: "" });

    // State not needed since games will not change (??)
    const [games, setGames] = useState([]);

    async function loadData() {
        setUsers(await getUsersExcept(user.id));
        setGames(await getGames());
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            {/* TextField for name */}
            {/* Select list for challenge type */}

            {/* <Box display="flex" justifyContent="center" alignItems="center"> */}

                <TextField
                    label="Username"
                    name="username"
                    value={form.username}
                    // onChange={handleFormChange}
                    required
                    fullWidth
                />

                <Select
                    required
                    label="Game Type"
                    name="game"
                    // value={form.department}
                    // onChange={e => setForm({ ...form, department: e.target.value })}
                >
                    <MenuItem value=""></MenuItem>
                    {
                        games.map(game => (
                            <MenuItem key={game.id} value={game.id}>
                                {game.name}
                            </MenuItem>
                        ))
                    }
                </Select>

                <Button type="submit" variant="contained">
                    Challenge
                </Button>
            {/* </Box> */}

            {/* Users list that changes depending on characters entered in TextField */}
            {users.map((user) => (
                <div>
                    {user.username}
                </div>
            ))}

            {games.map((game) => (
                <div>
                    {game.id} {game.name}
                </div>
            ))}

        </>
    )
}