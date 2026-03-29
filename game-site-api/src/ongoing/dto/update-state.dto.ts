import { GameState } from "../entities/ongoing.entity";

export class UpdateStateDto {
    gameId: number;
    state: GameState;
}