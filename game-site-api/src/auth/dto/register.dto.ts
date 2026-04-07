import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail({}, {message: 'Invalid email address'})
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
