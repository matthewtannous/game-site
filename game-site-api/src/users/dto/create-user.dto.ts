import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail({}, {message: 'Invalid email address'})
  email: string;

  @IsStrongPassword()
  password: string;
}
