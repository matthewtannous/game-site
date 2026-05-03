import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, Max, Min } from 'class-validator';

@InputType()
export class MoveDto {
  @Field((type) => Int)
  @IsPositive()
  @IsNotEmpty()
  gameId: number;

  @Field((type) => Int)
  @Min(0)
  @Max(41)
  @IsNotEmpty()
  move: number; // move is a number between 0 and 8 or between 0 and 41
}
