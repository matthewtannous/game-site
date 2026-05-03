import { IsDate, IsEnum, IsPositive, IsString } from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DetailedChallengeDto {
  @Field((type) => ID)
  @IsPositive()
  id: number;

  @Field((type) => Int)
  @IsPositive()
  senderId: number;

  @IsString()
  senderName: string;

  @Field((type) => Int)
  @IsPositive()
  receiverId: number;

  @IsString()
  receiverName: string;

  @IsEnum(GameType)
  gameType: GameType;

  @IsDate()
  createdAt: Date;
}
