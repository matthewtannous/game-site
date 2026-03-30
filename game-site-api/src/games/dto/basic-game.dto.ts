import { GameType } from '../../common/enums/game-type.enum';

export class BasicGameDto {
  player1Id: number;
  player2Id: number;
  gameType: GameType;
}
