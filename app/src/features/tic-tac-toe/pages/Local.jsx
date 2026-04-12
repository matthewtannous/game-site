import { useEffect, useState } from 'react';

import { calculateWinner } from '../../../utils/tic-tac-toe.js';
import Board from '../components/Board.jsx';
import ResetButton from '../../../components/ui/ResetButton.jsx';

export default function LocalTicTacToe() {
  // Array(9).fill(null) creates an array with 9 elements and fills it with null
  const [squares, setSquares] = useState(Array(9).fill(null));

  // To determine turns
  const [xIsNext, setXIsNext] = useState(true);

  // Determine turns and if someone won the game
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Display text about the game status (reruns everytime the component is updated)
    const winner = calculateWinner(squares);
    if (winner) setStatus('Winner: ' + winner);
    else setStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
  }, [squares, xIsNext]);

  function handleClick(index) {
    // return early if position already has a value or if the game is over
    if (squares[index] || calculateWinner(squares)) return;

    // Array should be copied, not directly updated
    const newSquares = squares.slice(); // slice copies the array
    if (xIsNext) newSquares[index] = 'X';
    else newSquares[index] = 'O';

    setSquares(newSquares);
    setXIsNext(!xIsNext); // inverse to alternate turns
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <Board
      squares={squares}
      handleSquareClick={handleClick}
      status={status}
      SideButton={<ResetButton onClick={reset} text="Reset" />}
    />
  );
}
