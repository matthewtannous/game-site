import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';

export class CreateGameDto {
  @IsPositive()
  @IsNotEmpty()
  player1Id: number;

  @IsPositive()
  @IsNotEmpty()
  player2Id: number;

  @IsEnum(GameType)
  @IsNotEmpty()
  gameType: GameType;
}
