// Used for updating a statistic

import { registerEnumType } from '@nestjs/graphql';

export enum StatisticName {
  player1_wins = 'player1Wins',
  player2_wins = 'player2Wins',
  draws = 'draws',
}

registerEnumType(StatisticName, {
  name: 'StatisticName',
  description: 'Different kinds of statistics',
});
