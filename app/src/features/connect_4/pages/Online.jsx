import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../../store/hooks/useAuth';
import Board from '../components/Board';
import SurrenderButton from '../../../components/ui/SurrenderButton';
import { calculateWinner } from '../../../utils/connect_4';
import { Typography } from '@mui/material';

import { GameState } from '../../../constants';

import {
  useAddGameMoveMutation,
  useGetOneGameQuery,
  useUpdateGameStateMutation,
} from '../../../store/slices/apiGameSlice';
import LoadingWheel from '../../../components/ui/LoadingWheel';
import { useEffect } from 'react';

export default function OnlineConnect4() {
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
        Transform it to be displayed (array of red and blue at positions from moves,
        e.g. [null, 'red', null, 'blue', null, null, 'blue', 'red', null])
    */
  const squares = Array(42).fill(null);
  for (let i = 0; i < moves.length; i++) {
    if (i % 2 === 0) squares[moves[i]] = 'blue';
    else squares[moves[i]] = 'red';
  }

  // Check if the game is finished
  const winner = calculateWinner(squares);
  const evenMoves = moves.length % 2 === 0;
  const isMyTurn = isPlayer1 ? !evenMoves : evenMoves;

  let status = '';
  if (winner === 'red') {
    // Player 1 is always red
    status = `Game over, ${game.player1Name} won`;
  } else if (winner === 'blue') {
    // Player 2 is always blue
    status = `Game over, ${game.player2Name} won`;
  } else if (moves.length === 42) {
    status = 'Tie';
  } else if (isMyTurn) {
    if (evenMoves) status = 'Playing as blue - Your turn';
    else status = 'Playing as red - Your turn';
  } else {
    if (evenMoves) status = 'Playing as red - Not your turn';
    else status = 'Playing as blue - Not your turn';
  }

  useEffect(() => {
    if (isLoading || game.state !== GameState.ongoing) return;

    const winner = calculateWinner(squares);

    if (winner === 'red') {
      updateState({ gameId: id, state: GameState.player1Won });
    } else if (winner === 'blue') {
      // Player 2 is always blue
      updateState({ gameId: id, state: GameState.player2Won });
    } else if (moves.length === 9) {
      updateState({ gameId: id, state: GameState.tie });
    }
  }, [moves.length, game.state]);

  async function handleClick(index) {
    // index is column (between 0 and 6)
    // return early if position already has a value or if the game is over
    if (calculateWinner(squares) || !isMyTurn || isUpdating) {
      return;
    }

    while (squares[index] && index < 42) index += 7;

    if (index >= 42) return;

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
          Playing Connect 4 against {opponentName}
        </Typography>
        <Board
          squares={squares}
          onButtonClick={handleClick}
          status={status}
          SideButton={<SurrenderButton onClick={surrender} text="forfeit" />}
          showSideButton={game.state === GameState.ongoing}
        />
      </>
    );
  }

  return content;
}
