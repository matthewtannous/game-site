import { IsPositive } from 'class-validator';
import { CreateChallengeInput } from './create-challenge.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

/** Information needed to update a challenge */
@InputType()
export class UpdateChallengeInput extends PartialType(CreateChallengeInput) {
  /** Unique integer ID */
  @Field((type) => ID)
  @IsPositive()
  id!: number;
}
