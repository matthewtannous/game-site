import { useState } from 'react';
import { Typography, ButtonGroup, Box, Grid } from '@mui/material';

import Square from '../components/Square.jsx';
import { calculateWinner } from '../../../utils/connect_4.js';
import PlaceButton from '../components/PlaceButton.jsx';
import ResetButton from '../../../components/ui/ResetButton.jsx'

const rowCount = 6;
const columnCount = 7;

export default function Board() {
    // Array(9).fill(null) creates an array with 9 elements and fills it with null
    const [squares, setSquares] = useState(Array(42).fill(null));

    // To determine turns
    const [blueIsNext, setBlueIsNext] = useState(true);

    function onButtonClick(index) { // index is column (between 0 and 6)
        if (calculateWinner(squares))
            return;

        while (squares[index] && index < 42)
            index += 7;

        if (index >= 42)
            return;

        const newSquares = squares.slice();

        if (blueIsNext)
            newSquares[index] = 'Blue';
        else
            newSquares[index] = 'Red';

        setSquares(newSquares);
        setBlueIsNext(!blueIsNext);
    }

    function reset() {
        setSquares(Array(42).fill(null));
        setBlueIsNext(true);
    }

    // Display text about the game status (reruns everytime the component is updated)
    const winner = calculateWinner(squares);
    let status;
    if (winner)
        status = "Winner: " + winner;
    else
        status = "Next player: " + (blueIsNext ? 'Blue' : 'Red');

    const rows = [];
    for (let row = rowCount - 1; row >= 0; row--) {
        const cols = [];

        for (let col = 0; col < columnCount; col++) {
            const i = row * 7 + col;

            cols.push(
                <Square
                    key={i}
                    value={squares[i]}
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

    const placeButtons = [];
    for (let i = 0; i < 7; i++) {
        placeButtons.push(
            <PlaceButton
                key={i}
                onSquareClick={() => onButtonClick(i)} />
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
                {placeButtons}
            </Box>

            <ResetButton
                onClick={reset}
            />
        </Grid>

    );
}