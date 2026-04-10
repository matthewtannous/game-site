/**
 * To determine the turn:
 * Player 2 will always start (Because player 2 will accept, better to accept 
 * and immediately be able to play). Therefore, if number of moves is even,
 * it is player 2 's turn. Otherwise it is player 1 's turn.
 */

import { useNavigate, useParams } from 'react-router-dom';
import { getOneGameDetailed, updateState } from '../../games/services/games.service';
import { useEffect, useState } from 'react';

import { useAuth } from '../../../store/hooks/useAuth';
import Board from '../components/Board';
import SurrenderButton from '../../../components/ui/SurrenderButton';
import { calculateWinner } from '../../../utils/tic-tac-toe';
import { Typography } from '@mui/material';

import { GameState } from '../../../constants';

import { useAddGameMoveMutation } from '../../../store/slices/apiSlice';

export default function OnlineTicTacToe() {
    const { user } = useAuth();
    const { id } = useParams();

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [status, setStatus] = useState("");
    const [turnOfPlayer, setTurnOfPlayer] = useState(true);
    const [opponentName, setOpponentName] = useState("");
    const [isPlayer1, setIsPlayer1] = useState(true);
    const [loadingMove, setLoadingMove] = useState(false);


    const [addMove] = useAddGameMoveMutation(); // has second argument but not needed

    const navigate = useNavigate();

    useEffect(() => {
        loadGameInfo();
    }, []);

    async function loadGameInfo() {
        // Load the board information
        const { moves, player1Id, player1Name, player2Name } = await getOneGameDetailed(id);
        /* 
            Move array contains integers of moves in order, e.g. [2,5,1,8]
            Transform it to be displayed (array of O and X at positions from moves,
            e.g. [null, 'O', null, 'X', null, null, 'X', 'O', null])
        */
        let newSquares = Array(9).fill(null);
        for (let i = 0; i < moves.length; i++) {
            if (i % 2 === 0)
                newSquares[moves[i]] = 'X';
            else
                newSquares[moves[i]] = 'O';
        }
        setSquares(newSquares);

        // Determine if player is player1 or player2
        const localIsPlayer1 = player1Id === user.id;
        setIsPlayer1(localIsPlayer1);

        // Check if the game is finished
        const winner = calculateWinner(newSquares)
        if (winner === 'O') {
            // Player 1 is always O
            setStatus(`Game over, ${player1Name} won`);
            updateState(id, GameState.player1Won);
            return;
        }
        if (winner === 'X') {
            // Player 2 is always X
            setStatus(`Game over, ${player2Name} won`);
            updateState(id, GameState.player2Won);
            return;
        }
        if (moves.length === 9) {
            setStatus("Tie");
            updateState(id, GameState.tie);
            return;
        }

        const evenMoves = moves.length % 2 === 0;

        // Determine the turn
        let turnLocal;
        if (localIsPlayer1) {
            turnLocal = !evenMoves;
            setOpponentName(player2Name);
        } else {
            // user is player 2
            turnLocal = evenMoves;
            setOpponentName(player1Name);
        }

        setTurnOfPlayer(turnLocal);

        if (turnLocal) {
            if (evenMoves)
                setStatus("Playing as X - Your turn");
            else
                setStatus("Playing as O - Your turn");
        } else {
            if (evenMoves)
                setStatus("Playing as O - Not your turn");
            else
                setStatus("Playing as X - Not your turn");
        }
    }

    async function handleClick(index) {
        // return early if position already has a value or if the game is over
        if (squares[index] || calculateWinner(squares) || !turnOfPlayer || loadingMove) {
            return;
        }

        setLoadingMove(true);
        // // Update UI
        // const newSquares = squares.slice();
        // newSquares[index] = squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
        // setSquares(newSquares);

        // Update move array in backend
        await addMove({ gameId: id, move: index });


        // Reload after small delay (prevent fetching old data from database)
        // CHANGE WITH WEBSOCKETS !!!!!!!!
        setTimeout(function () {
            loadGameInfo();
        }, 150);

        setLoadingMove(false);
    }

    function surrender() {
        // update state of the game (set winner to other player) 
        updateState(id, (isPlayer1 ? GameState.player2Won : GameState.player1Won));

        // Update overall scores (Needs stats table in backend)

        // go back to games
        navigate('/games');
    }

    return (
        <>
            <Typography
                variant='h4'
                color='secondary'
                align='center'
                marginBottom={2.5}
            >
                Playing Tic-Tac-Toe against {opponentName}
            </Typography>
            <Board
                squares={squares}
                handleSquareClick={handleClick}
                status={status}
                SideButton={<SurrenderButton onClick={surrender} text="forfeit" />}
            />
        </>
    )
}