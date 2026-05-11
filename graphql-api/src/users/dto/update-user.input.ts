import { IsPositive } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';

/** Information needed to update a User */
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  /** Unique integer ID */
  @IsPositive()
  id!: number;
}
