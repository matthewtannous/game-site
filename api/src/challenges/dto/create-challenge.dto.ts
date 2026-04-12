import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';

export class CreateChallengeDto {
  @IsPositive()
  @IsNotEmpty()
  senderId: number;

  @IsPositive()
  @IsNotEmpty()
  receiverId: number;

  @IsEnum(GameType)
  @IsNotEmpty()
  gameType: GameType;
}
