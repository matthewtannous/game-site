import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsStrongPassword()
  password: string;
}
