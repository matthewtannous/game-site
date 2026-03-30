import { PartialType } from '@nestjs/mapped-types';
import { CreateChallengeDto } from './create-challenge.dto';

import { GameType } from '../../common/enums/game-type.enum';

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {
  senderId: number;
  receiverId: number;
  gameType: GameType;
}
