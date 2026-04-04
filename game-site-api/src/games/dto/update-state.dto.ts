import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameState } from '../../common/enums/game-state.enum';

export class UpdateStateDto {
  @IsPositive()
  @IsNotEmpty()
  gameId: number;

  @IsEnum(GameState)
  @IsNotEmpty()
  state: GameState;
}
