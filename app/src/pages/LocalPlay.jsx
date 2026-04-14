import { Typography, Button, Stack, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';

import { Game } from '../constants';

import { useAuth } from '../store/hooks/useAuth';

export default function LocalPlay() {
  const { user } = useAuth();
  return (
    <>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Play locally!
      </Typography>

      <Stack sx={{ margin: 5 }}>
        <ButtonGroup
          variant="contained"
          component={Stack}
          sx={{
            gap: '16px',
          }}
        >
          {Object.entries(Game).map((game) => (
            <Button
              key={game[0]}
              component={Link}
              to={`/local/${game[0].replace(' ', '-')}`}
            >
              Play {game[1]}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>

      {user && (
        <Typography sx={{ textAlign: 'center' }}>
          Local games do not affect your stats
        </Typography>
      )}
    </>
  );
}
