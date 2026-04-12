/**
 * To determine the turn:
 * Player 2 will always start (Because player 2 will accept, better to accept
 * and immediately be able to play). Therefore, if number of moves is even,
 * it is player 2 's turn. Otherwise it is player 1 's turn.
 */

import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../../store/hooks/useAuth';
import Board from '../components/Board';
import SurrenderButton from '../../../components/ui/SurrenderButton';
import { calculateWinner } from '../../../utils/tic-tac-toe';
import { Typography } from '@mui/material';

import { GameState } from '../../../constants';

import {
  useAddGameMoveMutation,
  useGetOneGameQuery,
  useUpdateGameStateMutation,
} from '../../../store/slices/apiGameSlice';
import LoadingWheel from '../../../components/ui/LoadingWheel';
import { useEffect } from 'react';

export default function OnlineTicTacToe() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: game = {}, isLoading } = useGetOneGameQuery(id);
  const [addMove, { isLoading: isUpdating }] = useAddGameMoveMutation();
  const [updateState] = useUpdateGameStateMutation();

  // Get game information
  const moves = game.moves || [];
  const isPlayer1 = game.player1Id === user.id;
  const opponentName = isPlayer1 ? game.player2Name : game.player1Name;

  /* 
        Move array contains integers of moves in order, e.g. [2,5,1,8]
        Transform it to be displayed (array of O and X at positions from moves,
        e.g. [null, 'O', null, 'X', null, null, 'X', 'O', null])
    */
  const squares = Array(9).fill(null);
  for (let i = 0; i < moves.length; i++) {
    if (i % 2 === 0) squares[moves[i]] = 'X';
    else squares[moves[i]] = 'O';
  }

  // Check if the game is finished
  const winner = calculateWinner(squares);
  const evenMoves = moves.length % 2 === 0;
  const isMyTurn = isPlayer1 ? !evenMoves : evenMoves;

  let status = '';
  if (winner === 'O') {
    // Player 1 is always O
    status = `Game over, ${game.player1Name} won`;
  } else if (winner === 'X') {
    // Player 2 is always X
    status = `Game over, ${game.player2Name} won`;
  } else if (moves.length === 9) {
    status = 'Tie';
  } else if (isMyTurn) {
    if (evenMoves) status = 'Playing as X - Your turn';
    else status = 'Playing as O - Your turn';
  } else {
    if (evenMoves) status = 'Playing as O - Not your turn';
    else status = 'Playing as X - Not your turn';
  }

  useEffect(() => {
    if (isLoading || game.state !== GameState.ongoing) return;

    const winner = calculateWinner(squares);

    if (winner === 'O') {
      updateState({ gameId: id, state: GameState.player1Won });
    } else if (winner === 'X') {
      // Player 2 is always X
      updateState({ gameId: id, state: GameState.player2Won });
    } else if (moves.length === 9) {
      updateState({ gameId: id, state: GameState.tie });
    }
  }, [moves.length, game.state]);

  async function handleClick(index) {
    // return early if position already has a value or if the game is over
    if (squares[index] || calculateWinner(squares) || !isMyTurn || isUpdating) {
      return;
    }

    // Update move array in backend (will automatically re-render)
    await addMove({ gameId: id, move: index });
  }

  function surrender() {
    // update state of the game (set winner to other player)
    updateState({
      gameId: id,
      state: isPlayer1 ? GameState.player2Won : GameState.player1Won,
    });

    // Update overall scores (Needs stats table in backend)

    // go back to games
    navigate('/games');
  }

  let content;
  if (isLoading) {
    content = <LoadingWheel />;
  } else {
    content = (
      <>
        <Typography
          variant="h4"
          color="secondary"
          align="center"
          marginBottom={2.5}
        >
          Playing Tic-Tac-Toe against {opponentName}
        </Typography>
        <Board
          squares={squares}
          handleSquareClick={handleClick}
          status={status}
          SideButton={<SurrenderButton onClick={surrender} text="forfeit" />}
          showSideButton={game.state === GameState.ongoing}
        />
      </>
    );
  }

  return content;
}
