import { IsArray, IsDate, IsEnum, IsPositive, IsString } from 'class-validator';
import { GameState } from '../../common/enums/game-state.enum';
import { GameType } from '../../common/enums/game-type.enum';

export class DetailedGameDto {
  @IsPositive()
  id: number;

  @IsPositive()
  player1Id: number;

  @IsString()
  player1Name: string;

  @IsPositive()
  player2Id: number;

  @IsString()
  player2Name: string;

  @IsEnum(GameType)
  gameType: GameType;

  @IsArray()
  moves: number[];

  @IsDate()
  lastMovePlayedAt: Date;

  @IsEnum(GameState)
  state: GameState;
}
