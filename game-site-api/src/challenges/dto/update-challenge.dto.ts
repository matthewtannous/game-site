import { PartialType } from '@nestjs/mapped-types';
import { CreateChallengeDto } from './create-challenge.dto';

import { Game } from "src/common/enums/game.enum";

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {
  senderId: number;
  receiverId: number;
  gameType: Game;
}
