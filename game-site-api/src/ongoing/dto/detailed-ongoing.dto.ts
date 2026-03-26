export class DetailedOngoingDto {
  id: number;

  player1Id: number;
  player1Name: string;

  player2Id: number;
  player2Name: string;

  gameType: number;
  gameName: string;

  moves: number[];
  lastMovePlayedAt: Date;
}
