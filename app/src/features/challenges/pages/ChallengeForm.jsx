import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

// import { createChallenge } from '../services/challenges.service';
import { useCreateChallengeMutation } from '../../../store/slices/apiChallengeSlice';

import { useAuth } from '../../../store/hooks/useAuth';
import { getUsersExcept } from '../../users/services/users.service';

import { Game } from '../../../constants';

export default function ChallengeForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ username: '', game: '' });
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [alert, setAlert] = useState({ type: '', message: '' });

  const [createChallenge] = useCreateChallengeMutation();
  async function loadData() {
    // users itself is never rendered, does not need state
    const users = await getUsersExcept(user.id);

    // Update users that match search query
    if (!form.username || form.username.length === 0) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.username.includes(form.username),
      );
      setFilteredUsers(filtered);
    }
  }

  useEffect(() => {
    loadData();
  }, [form]);

  async function sendChallenge(challenged_id, challenged_username) {
    if (!form.game) {
      setAlert({ type: 'error', message: 'Please Choose a game first!' });
      return;
    }

    const res = await createChallenge({
      senderId: user.id,
      receiverId: challenged_id,
      gameType: form.game,
    });
    if (res.error) {
      setAlert({
        type: 'error',
        message: `You already have a pending challenge of ${form.game} with ${challenged_username}`,
      });
    } else {
      setAlert({
        type: 'success',
        message: `Challenged ${challenged_username} to a game of ${form.game}`,
      });
    }
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{ marginTop: 1, marginBottom: 1, minWidth: 250 }}
      >
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
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
            onChange={(e) => setForm({ ...form, game: e.target.value })}
          >
            {Object.entries(Game).map((game) => (
              <MenuItem key={game[0]} value={game[0]}>
                {game[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {alert.message && (
        <Alert
          severity={alert.type}
          onClose={() => setAlert({ type: '', message: '' })}
        >
          {alert.message}
        </Alert>
      )}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2.5}
      >
        <List sx={{ width: '100%', maxWidth: 500 }}>
          {filteredUsers.map((user) => (
            <ListItem
              key={user.id}
              divider
              secondaryAction={
                <Button
                  variant="contained"
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
  );
}
