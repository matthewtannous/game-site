import { PartialType } from '@nestjs/mapped-types';
import { CreateStatisticDto } from './create-statistic.dto';
import { GameType } from '../../common/enums/game-type.enum';

import { StatisticName } from '../../common/enums/statistic-name.enum';
export class IncrementStatisticDto extends PartialType(CreateStatisticDto) {
    player1Id: number;
    player2Id: number;

    gameType: GameType;

    statistic: StatisticName;
}
