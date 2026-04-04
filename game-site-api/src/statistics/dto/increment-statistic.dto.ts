import { PickType } from '@nestjs/mapped-types';
import { CreateStatisticDto } from './create-statistic.dto';

import { StatisticName } from '../../common/enums/statistic-name.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class IncrementStatisticDto extends PickType(CreateStatisticDto, [
  'player1Id',
  'player2Id',
  'gameType',
]) {
  @IsEnum(StatisticName)
  @IsNotEmpty()
  statistic: StatisticName;
}
