import { GameType } from "../../common/enums/game-type.enum";

export class CreateStatisticDto {
    player1Id: number;
    player2Id: number;

    gameType: GameType;

    // player1Wins: number;
    // player2Wins: number;
    // draws: number;
}
