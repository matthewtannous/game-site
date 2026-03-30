import { GameState } from '../../common/enums/game-state.enum';
import { Game } from '../../common/enums/game.enum';

export class DetailedOngoingDto {
  id: number;

  player1Id: number;
  player1Name: string;

  player2Id: number;
  player2Name: string;

  gameType: Game;

  moves: number[];
  lastMovePlayedAt: Date;

  state: GameState;
}
