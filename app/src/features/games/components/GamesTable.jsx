import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

import { Link } from 'react-router-dom';
import { useAuth } from '../../../store/hooks/useAuth';

export default function GamesTable({ games, username, finished }) {
  const { user } = useAuth();

  // Update game state to be displayed instead of 'player1_won' or 'player2_won'
  // Use a copy because we cannot modify part of the state
  let copy = games.map((game) => {
    if (!finished || game.state === 'tie') return game;

    const isWin =
      (game.state === 'player1_won' && game.player1Id === user.id) ||
      (game.state === 'player2_won' && game.player2Id === user.id);

    return {
      ...game,
      state: isWin ? 'Win' : 'Loss',
    };
  });

  return (
    <>
      <Typography variant="h5" marginBottom={3} marginTop={4} align="center">
        {' '}
        {finished ? 'Finished' : 'Ongoing'} Games
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" width={200}>
              Opponent
            </TableCell>
            <TableCell align="center" width={200}>
              Game Type
            </TableCell>
            <TableCell align="center" width={300}>
              {finished ? 'Finished On' : 'Time of Last Move'}{' '}
            </TableCell>
            {finished && (
              <TableCell align="center" width={300}>
                Result
              </TableCell>
            )}
            <TableCell align="center" width={200}>
              Check Game
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {copy.map((game) => (
            <TableRow key={game.id}>
              <TableCell align="center">
                {game.player1Name === username
                  ? game.player2Name
                  : game.player1Name}
              </TableCell>
              <TableCell align="center">{game.gameType}</TableCell>
              <TableCell align="center">
                {formatDistanceToNow(game.lastMovePlayedAt, {
                  // addSuffix: true, // add 'ago' manually instead, because this sometimes prints messages with 'in'
                  includeSeconds: true,
                })}{' '}
                ago
              </TableCell>
              {finished && <TableCell align="center">{game.state}</TableCell>}
              <TableCell align="center">
                <Button
                  color="secondary"
                  LinkComponent={Link}
                  to={`/games/${game.gameType.replace(' ', '-').toLowerCase()}/${game.id}`}
                  variant="contained"
                  size="small"
                >
                  GO
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
