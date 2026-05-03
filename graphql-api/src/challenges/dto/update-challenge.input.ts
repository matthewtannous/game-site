import { IsPositive } from 'class-validator';
import { CreateChallengeInput } from './create-challenge.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChallengeInput extends PartialType(CreateChallengeInput) {
  @Field((type) => ID)
  @IsPositive()
  id: number;
}
