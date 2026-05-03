import { registerEnumType } from '@nestjs/graphql';

export enum GameType {
  ticTacToe = 'tic-tac-toe',
  connect4 = 'connect 4',
}

registerEnumType(GameType, {
  name: 'GameType',
  description: 'All game types',
});
