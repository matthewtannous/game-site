import { IsArray, IsDate, IsEnum, IsPositive, IsString } from 'class-validator';
import { GameState } from '../../common/enums/game-state.enum';
import { GameType } from '../../common/enums/game-type.enum';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DetailedGameDto {
  @Field((type) => ID)
  @IsPositive()
  id: number;

  @Field((type) => Int)
  @IsPositive()
  player1Id: number;

  @IsString()
  player1Name: string;

  @Field((type) => Int)
  @IsPositive()
  player2Id: number;

  @IsString()
  player2Name: string;

  @IsEnum(GameType)
  gameType: GameType;

  @Field((type) => [Int])
  @IsArray()
  moves: number[];

  @IsDate()
  lastMovePlayedAt: Date;

  @IsEnum(GameState)
  state: GameState;
}
