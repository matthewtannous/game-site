/**
 * Not needed since updates will only be to increment either player1Wins,
 * player2Wins, or draws
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateStatisticDto } from './create-statistic.dto';
import { GameType } from '../../common/enums/game-type.enum';

export class UpdateStatisticDto extends PartialType(CreateStatisticDto) {
    player1Id: number;
    player2Id: number;

    gameType: GameType;

    player1Wins: number;
    player2Wins: number;
    draws: number;
}
