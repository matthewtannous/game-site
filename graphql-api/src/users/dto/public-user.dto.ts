import { ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

/** Returned information when accessing a User */
@ObjectType()
export class PublicUserDto {
  /** Unique integer ID */
  @IsPositive()
  id!: number;

  /** Unique username */
  @IsNotEmpty()
  username!: string;

  /** Email address */
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  /** Time of account creation */
  @IsDate()
  createdAt!: string; // Does not work with type 'Date'
}
