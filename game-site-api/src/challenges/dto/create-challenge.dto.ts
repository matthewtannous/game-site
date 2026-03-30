import { Game } from "src/common/enums/game.enum";

export class CreateChallengeDto {
  senderId: number;
  receiverId: number;
  gameType: Game;
}
