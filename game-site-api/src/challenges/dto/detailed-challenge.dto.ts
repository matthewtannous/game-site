import { IsDate, IsEnum, IsPositive, IsString } from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';

export class DetailedChallengeDto {
  @IsPositive()
  senderId: number;

  @IsString()
  senderName: string;

  @IsPositive()
  receiverId: number;

  @IsString()
  receiverName: string;

  @IsEnum(GameType)
  gameType: GameType;

  @IsDate()
  createdAt: Date;
}
