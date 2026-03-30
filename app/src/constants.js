export const GameState = Object.freeze({
    ongoing: 'ongoing',
    tie: 'tie',
    player1Won: 'player1_won',
    player2Won: 'player2_won',
});

// Elements of form: {'database name' : 'Display Name'}
export const Game = Object.freeze({
    'tic-tac-toe': 'Tic-Tac-Toe',
    'connect 4': 'Connect 4',
});