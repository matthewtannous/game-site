import { OmitType } from '@nestjs/swagger';
import { DetailedGameDto } from './detailed-game.dto';

export class DetailedGameNoMovesDto extends OmitType(DetailedGameDto, [
  'moves',
] as const) {}
