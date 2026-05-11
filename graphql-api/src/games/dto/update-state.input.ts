import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameState } from '../../common/enums/game-state.enum';
import { Field, InputType, Int } from '@nestjs/graphql';

/** Information needed to update only a Game's state */
@InputType()
export class UpdateStateDto {
  /** Unique integer ID for the Game */
  @Field((type) => Int)
  @IsPositive()
  @IsNotEmpty()
  gameId!: number;

  /** New state of the game */
  @IsEnum(GameState)
  @IsNotEmpty()
  state!: GameState;
}
