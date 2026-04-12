import { Typography, ButtonGroup, Box, Grid } from '@mui/material';

import Square from './Square.jsx';
import PlaceButton from './PlaceButton.jsx';

const rowCount = 6;
const columnCount = 7;

export default function Board({
  squares,
  status,
  onButtonClick,
  SideButton,
  showSideButton,
}) {
  const rows = [];
  for (let row = rowCount - 1; row >= 0; row--) {
    const cols = [];

    for (let col = 0; col < columnCount; col++) {
      const i = row * 7 + col;

      cols.push(<Square key={i} value={squares[i]} />);
    }

    rows.push(
      <ButtonGroup
        key={row}
        sx={{
          display: 'table',
          clear: 'both',
        }}
      >
        {cols}
      </ButtonGroup>,
    );
  }

  const placeButtons = [];
  for (let i = 0; i < 7; i++) {
    placeButtons.push(
      <PlaceButton key={i} onButtonClick={() => onButtonClick(i)} />,
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box>
        <Typography
          variant="h6"
          sx={{
            marginBottom: '15px',
          }}
        >
          {status}
        </Typography>
        {rows}
        {placeButtons}
      </Box>
      {showSideButton && SideButton}
    </Grid>
  );
}
