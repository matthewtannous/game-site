import { IsArray, IsDate, IsEnum, IsPositive, IsString } from 'class-validator';
import { GameState } from '../../common/enums/game-state.enum';
import { GameType } from '../../common/enums/game-type.enum';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

/** Detailed information about a Game */
@ObjectType()
export class DetailedGameDto {
  /** Unique integer ID */
  @Field((type) => ID)
  @IsPositive()
  id!: number;

  /** Player 1's unique ID */
  @Field((type) => Int)
  @IsPositive()
  player1Id!: number;

  /** Player 1's username (also unique) */
  @IsString()
  player1Name!: string;

  /** Player 2's unique ID */
  @Field((type) => Int)
  @IsPositive()
  player2Id!: number;

  /** Player 2's username (also unique) */
  @IsString()
  player2Name!: string;

  /** Type of Game */
  @IsEnum(GameType)
  gameType!: GameType;

  /** All moves that happened until now */
  @Field((type) => [Int])
  @IsArray()
  moves!: number[];

  /** Time of last move being played */
  @IsDate()
  lastMovePlayedAt!: Date;

  /** Current state of the game */
  @IsEnum(GameState)
  state!: GameState;
}
