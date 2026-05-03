import { registerEnumType } from '@nestjs/graphql';

export enum GameState {
  ongoing = 'ongoing',
  tie = 'tie',
  player1Won = 'player1_won',
  player2Won = 'player2_won',
}

registerEnumType(GameState, {
  name: 'GameState',
  description: 'Possible states of a game',
});
