import { Typography } from '@mui/material';
import { useAuth } from '../store/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Typography variant='h3' align='center' marginTop={5}>
        Hello, {user.username}!
      </Typography>
    </>
  );
}
