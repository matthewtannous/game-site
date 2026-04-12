import { Button } from '@mui/material';

export default function Square({ value, onSquareClick }) {
  return (
    <Button
      variant="outlined"
      sx={{
        height: '80px',
        width: '80px',
        background: '#f8f8f8',
        border: '1px solid #999',
        float: 'left',
        fontSize: '50px',
        lineHeight: '40px',
        padding: 0,
        textAlign: 'center',
        color: value === 'X' ? 'blue' : 'red',
      }}
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}
