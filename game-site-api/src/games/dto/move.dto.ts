import { IsNotEmpty, IsPositive, Max, Min } from 'class-validator';

export class MoveDto {
  @IsPositive()
  @IsNotEmpty()
  gameId: number;

  @Min(0)
  @Max(41)
  @IsNotEmpty()
  move: number; // move is a number between 0 and 8 or between 0 and 41
}
