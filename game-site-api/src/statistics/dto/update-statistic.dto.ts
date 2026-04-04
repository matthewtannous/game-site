/**
 * Not needed since updates will only be to increment either player1Wins,
 * player2Wins, or draws
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateStatisticDto } from './create-statistic.dto';

export class UpdateStatisticDto extends CreateStatisticDto {}
