import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameType } from 'src/common/enums/game-type.enum';

/** Information needed to create a Game */
@InputType()
export class CreateGameInput {
  /** Player 1's unique ID */
  @Field((type) => Int)
  @IsPositive()
  @IsNotEmpty()
  player1Id!: number;

  /** Player 2's unique ID */
  @Field((type) => Int)
  @IsPositive()
  @IsNotEmpty()
  player2Id!: number;

  /** Type of Game */
  @IsEnum(GameType)
  @IsNotEmpty()
  gameType!: GameType;
}
