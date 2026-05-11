import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, Max, Min } from 'class-validator';

/** Information needed to make a move in a Game */
@InputType()
export class MoveDto {
  /** Unique integer ID for the game to which a move is being added */
  @Field((type) => Int)
  @IsPositive()
  @IsNotEmpty()
  gameId!: number;

  /**
   * The move being made
   * Integer between 0 and 8 for tic-tac-toe, and between 0 and 41 for connect 4
   */
  @Field((type) => Int)
  @Min(0)
  @Max(41)
  @IsNotEmpty()
  move!: number; // move is a number between 0 and 8 or between 0 and 41
}
