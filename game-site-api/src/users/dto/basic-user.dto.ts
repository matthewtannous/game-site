import { IsDate, IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

export class BasicUserDto {
  @IsPositive()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsEmail({}, {message: 'Invalid email address'})
  email: string;

  @IsDate()
  createdAt: Date;
}
