import { useEffect, useState } from 'react';

import { calculateWinner } from '../../../utils/connect_4.js';
import ResetButton from '../../../components/ui/ResetButton.jsx'

import Board from '../components/Board.jsx';

export default function LocalConnect4() {
    const [squares, setSquares] = useState(Array(42).fill(null));

    // To determine turns
    const [blueIsNext, setBlueIsNext] = useState(true);

    const [status, setStatus] = useState("");


    useEffect(() => {
        // Display text about the game status (reruns everytime the component is updated)
        const winner = calculateWinner(squares);
        if (winner)
            setStatus("Winner: " + winner);
        else
            setStatus("Next player: " + (blueIsNext ? 'Blue' : 'Red'));

    });

    function handleButtonClick(index) { // index is column (between 0 and 6)
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

    return (
        <Board
            squares={squares}
            status={status}
            onButtonClick={handleButtonClick}
            SideButton={<ResetButton onClick={reset} text={"Reset"} />}
        />

    );
}