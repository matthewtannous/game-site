import { GameState } from '../../common/enums/game-state.enum';
import { Game } from "src/common/enums/game.enum";


export class DetailedOngoingNoMovesDto {
  id: number;

  player1Id: number;
  player1Name: string;

  player2Id: number;
  player2Name: string;

  gameType: Game;

  lastMovePlayedAt: Date;

  state: GameState;
}
