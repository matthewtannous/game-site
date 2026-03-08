import { useState } from 'react';
import { Typography, ButtonGroup, Grid, Box } from '@mui/material';

import Square from '../components/Square.jsx';
import { calculateWinner } from '../../../utils/tic-tac-toe.js';
import ResetButton from '../../../components/ui/ResetButton.jsx';


export default function Board() {
    // Array(9).fill(null) creates an array with 9 elements and fills it with null
    const [squares, setSquares] = useState(Array(9).fill(null));

    // To determine turns
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(index) {
        // return early if position already has a value or if the game is over
        if (squares[index] || calculateWinner(squares))
            return;

        // Array should be copied, not directly updated
        const newSquares = squares.slice(); // slice copies the array
        if (xIsNext)
            newSquares[index] = 'X';
        else
            newSquares[index] = 'O';

        setSquares(newSquares);
        setXIsNext(!xIsNext); // inverse to alternate turns
    }

    function reset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    // Display text about the game status (reruns everytime the component is updated)
    const winner = calculateWinner(squares);
    let status;
    if (winner)
        status = "Winner: " + winner;
    else
        status = "Next player: " + (xIsNext ? 'X' : 'O');

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
                    onSquareClick={() => handleClick(i)}
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
            <ResetButton
                onClick={reset}
            />
        </Grid>
    );
}