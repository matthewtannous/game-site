import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameState } from '../../common/enums/game-state.enum';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateStateDto {
  @Field((type) => Int)
  @IsPositive()
  @IsNotEmpty()
  gameId: number;

  @IsEnum(GameState)
  @IsNotEmpty()
  state: GameState;
}
