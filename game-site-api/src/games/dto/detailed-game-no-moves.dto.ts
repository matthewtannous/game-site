import { OmitType } from '@nestjs/mapped-types';
import { GameState } from '../../common/enums/game-state.enum';
import { GameType } from '../../common/enums/game-type.enum';
import { DetailedGameDto } from './detailed-game.dto';

export class DetailedGameNoMovesDto extends OmitType(DetailedGameDto, [
  'moves',
] as const) {}
