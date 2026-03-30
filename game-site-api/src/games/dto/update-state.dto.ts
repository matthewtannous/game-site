import { GameState } from '../../common/enums/game-state.enum';

export class UpdateStateDto {
  gameId: number;
  state: GameState;
}
