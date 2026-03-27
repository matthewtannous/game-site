export class DetailedOngoingNoMovesDto {
  id: number;

  player1Id: number;
  player1Name: string;

  player2Id: number;
  player2Name: string;

  gameType: number;
  gameName: string;

  lastMovePlayedAt: Date;
}
