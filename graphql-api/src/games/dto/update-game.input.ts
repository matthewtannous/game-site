import { CreateGameInput } from './create-game.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

/** Information needed to update a Game */
@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  /** Unique integer ID */
  @Field(() => Int)
  id!: number;
}
