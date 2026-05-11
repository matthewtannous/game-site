import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

/** Information needed to create a User */
@InputType()
export class CreateUserInput {
  /** Unique username */
  @IsNotEmpty()
  username!: string;

  /** Unique email address */
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  /** Strong password (encrypted) */
  @IsStrongPassword()
  password!: string;
}
