import { Int, Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';

@ObjectType()
export class PublicChallengeDto {
  /** Sender's unique ID */
  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  senderId!: number;

  /** Receiver's unique ID */
  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  receiverId!: number;

  /** Type of game */
  @IsEnum(GameType)
  @IsNotEmpty()
  gameType!: GameType;

  /** Time of challenge creation */
  @IsDate()
  createdAt!: Date;
}
