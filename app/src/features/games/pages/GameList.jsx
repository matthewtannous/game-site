import { Paper } from '@mui/material';
import LoadingWheel from '../../../components/ui/LoadingWheel';

import { useAuth } from '../../../store/hooks/useAuth';

import GamesTable from '../components/GamesTable';
import ErrorMessage from '../../../components/ui/ErrorMessage';
import { useGetAllGamesOneUserQuery } from '../../../store/slices/apiGameSlice';

export default function GameList() {
  const { user } = useAuth();

  // 'data' is an object with many fields, extract 'detailedGamesForPlayer' and name it 'games'
  const {
    data: { detailedGamesForPlayer: games } = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetAllGamesOneUserQuery(user.id);
  let content;
  if (isLoading) {
    content = <LoadingWheel />;
  } else if (isError) {
    content = <ErrorMessage />;
  } else if (isSuccess) {
    content = (
      <Paper>
        <GamesTable
          games={games.filter((game) => game.state === 'ongoing')}
          username={user.username}
          finished={false}
        />

        <GamesTable
          games={games.filter((game) => game.state !== 'ongoing')}
          username={user.username}
          finished={true}
        />
      </Paper>
    );
  }

  return content;
}
