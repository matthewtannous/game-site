import { ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

@ObjectType()
export class PublicUserDto {
  @IsPositive()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsDate()
  createdAt: string; // Does not work with type 'Date'
}
