import { PartialType } from '@nestjs/mapped-types';
import { CreateOngoingDto } from './create-ongoing.dto';

export class UpdateOngoingDto extends PartialType(CreateOngoingDto) {
  player1Id: number;
  player2Id: number;
  gameType: number;
}
