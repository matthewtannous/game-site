import { IsDate, IsEnum, IsPositive, IsString } from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

/** Detailed information about a Challenge */
@ObjectType()
export class DetailedChallengeDto {
  /** Unique integer ID */
  @Field((type) => ID)
  @IsPositive()
  id!: number;

  /** Sender's unique ID */
  @Field((type) => Int)
  @IsPositive()
  senderId!: number;

  /** Sender's username (also unique) */
  @IsString()
  senderName!: string;

  /** Receiver's unique ID */
  @Field((type) => Int)
  @IsPositive()
  receiverId!: number;

  /** Receiver's name (also unique) */
  @IsString()
  receiverName!: string;

  /** Type of game */
  @IsEnum(GameType)
  gameType!: GameType;

  /** Time of challenge creation */
  @IsDate()
  createdAt!: Date;
}
