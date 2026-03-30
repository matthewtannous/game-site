import { GameState } from '../../common/enums/game-state.enum';
import { GameType } from '../../common/enums/game-type.enum';

export class DetailedGameNoMovesDto {
  id: number;

  player1Id: number;
  player1Name: string;

  player2Id: number;
  player2Name: string;

  gameType: GameType;

  lastMovePlayedAt: Date;

  state: GameState;
}
