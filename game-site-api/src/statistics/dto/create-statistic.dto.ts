import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';

export class CreateStatisticDto {
  @IsPositive()
  @IsNotEmpty()
  player1Id: number;

  @IsPositive()
  @IsNotEmpty()
  player2Id: number;

  @IsEnum(GameType)
  @IsNotEmpty()
  gameType: GameType;

  @Min(0)
  @IsOptional()
  player1Wins: number;

  @Min(0)
  @IsOptional()
  player2Wins: number;

  @Min(0)
  @IsOptional()
  draws: number;
}
