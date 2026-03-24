/**
 * IDEA:
 * a dynamic list that shows all users at the start, but as the user enters
 * characters in the search bar, only the names that match remain.
 * When the user clicks on a name, the search bar auto-completes with the name
 * 
 * Also add a selection for game type
 */

import { useEffect, useState } from 'react';
import { Alert, Box, Button, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';

import { createChallenge } from '../services/challenges.service'
import { useAuth } from '../../../store/hooks/useAuth';
import { getUsersExcept } from '../../users/services/users.service';

/*
Since we only need one function to get all games and we will not use it anywhere else in the app,
import api directly here to avoid creating a service file that will only be used here
*/
import { api } from '../../../services/api';

export default function ChallengeForm() {
    const { user } = useAuth();
    const [form, setForm] = useState({ username: "", game: "" });
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [alert, setAlert] = useState({ type: "", message: "" });

    const [games, setGames] = useState([]);

    async function loadData() {
        // users itself is never rendered, does not need state
        const users = await getUsersExcept(user.id);
        setGames(await api('/games'));

        // Update users that match search query
        if (!form.username || form.username.length === 0) {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter(user => user.username.includes(form.username));
            setFilteredUsers(filtered);
        }
    }

    useEffect(() => {
        loadData();
    }, [form]);

    async function sendChallenge(id, challenged_username) {
        if (!form.game) {
            setAlert({ type: "error", message: "Please Choose a game first!" });
            return;
        }

        try {
            await createChallenge({ senderId: user.id, receiverId: id, gameType: form.game })
            setAlert({
                type: "success",
                message: `Challenged ${challenged_username} to a game of ${games.find(g => g.id === form.game).name}`
            });
        } catch (error) {
            setAlert({
                type: "error",
                message: `You already have a pending challenge of ${games.find(g => g.id === form.game).name} with ${challenged_username}`
            });
        }
    }

    return (
        <>
            <Stack direction="row" spacing={3} sx={{ marginTop: 1, marginBottom: 1, minWidth: 250 }}>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    required
                />

                <FormControl sx={{ minWidth: 250 }}>
                    <InputLabel id="game-selection-label">Game</InputLabel>
                    <Select
                        labelId="game-selection-label"
                        id="game-selection"
                        value={form.game}
                        autoWidth
                        label="Game Type"
                        required
                        onChange={e => setForm({ ...form, game: e.target.value })}
                    >
                        {
                            games.map(game => (
                                <MenuItem key={game.id} value={game.id}>
                                    {game.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Stack>

            {alert.message &&
                <Alert severity={alert.type} onClose={() => setError("")}>
                    {alert.message}
                </Alert>}

            <Box display="flex" justifyContent="center" alignItems="center" marginTop={2.5}>
                <List sx={{ width: '100%', maxWidth: 500 }}>
                    {filteredUsers.map((user) => (
                        <ListItem
                            key={user.id}
                            divider
                            secondaryAction={
                                <Button
                                    variant='contained'
                                    onClick={() => sendChallenge(user.id, user.username)}
                                >
                                    Challenge!
                                </Button>
                            }
                        >
                            <ListItemText>{user.username}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    )
}