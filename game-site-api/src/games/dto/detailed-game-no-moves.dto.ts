import { OmitType } from '@nestjs/mapped-types';
import { DetailedGameDto } from './detailed-game.dto';

export class DetailedGameNoMovesDto extends OmitType(DetailedGameDto, [
  'moves',
] as const) {}
