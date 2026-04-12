import { Button } from '@mui/material';

export default function ResetButton({ onClick, text }) {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={onClick}
      sx={{
        marginTop: '40px',
        marginLeft: '30px',
        height: '75px',
        width: '100px',
      }}
    >
      {text}
    </Button>
  );
}
