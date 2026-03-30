import { GameType } from '../../common/enums/game-type.enum';

export class DetailedChallengeDto {
  senderId: number;
  senderName: string;

  receiverId: number;
  receiverName: string;

  gameType: GameType;

  createdAt: Date;
}
