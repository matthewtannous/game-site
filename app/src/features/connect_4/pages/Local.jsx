import { useState } from 'react';
import { Button, Typography, ButtonGroup, List, ListItem, Grid, Box } from '@mui/material';

import Square from '../components/Square.jsx';
import { calculateWinner } from '../../../utils/tic-tac-toe.js';

function Board({ xIsNext, squares, onPlay }) {
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

        onPlay(newSquares);
    }

    // Display text about the game status (reruns everytime the component is updated)
    const winner = calculateWinner(squares);
    let status;
    if (winner)
        status = "Winner: " + winner;
    else
        status = "Next player: " + (xIsNext ? 'X' : 'O');

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
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]); // array of arrays
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove] // current board

    const xIsNext = currentMove % 2 === 0;

    function handlePlay(newSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0)
            description = "Go to move #" + move;
        else
            description = "Go to game start";

        return (
            <ListItem key={move} sx={{ marginBottom: '-8px' }}>
                <Button
                    variant='contained'
                    onClick={() => jumpTo(move)}
                    size='small'
                >
                    {description}
                </Button>
            </ListItem>
        )
    });

    return (
        <Grid container>
            <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
            />
            <List sx={{ marginTop: '30px' }}>{moves}</List>
        </Grid>
    )
}