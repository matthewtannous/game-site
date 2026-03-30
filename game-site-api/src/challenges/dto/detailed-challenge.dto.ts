import { Game } from "src/common/enums/game.enum";

export class DetailedChallengeDto {
  senderId: number;
  senderName: string;

  receiverId: number;
  receiverName: string;

  gameType: Game;

  createdAt: Date;
}
