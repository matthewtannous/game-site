import { Typography, ButtonGroup, Grid, Box } from '@mui/material';

import Square from './Square.jsx';

export default function Board({ squares, handleSquareClick, status, SideButton }) {
    // Create board
    const rows = [];
    for (let row = 0; row < 3; row++) {
        const cols = [];

        for (let col = 0; col < 3; col++) {
            const i = row * 3 + col;

            cols.push(
                <Square
                    key={i}
                    value={squares[i]}
                    onSquareClick={() => handleSquareClick(i)}
                />
            );
        }

        rows.push(
            <ButtonGroup
                key={row}
                sx={{
                    display: 'table',
                    clear: 'both',
                }}>
                {cols}
            </ButtonGroup>
        )
    }

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
        >
            <Box>
                <Typography
                    variant='h6'
                    sx={{
                        marginBottom: '15px'
                    }}
                >
                    {status}
                </Typography>
                {rows}
            </Box>
            {SideButton}
        </Grid>
    );
}
