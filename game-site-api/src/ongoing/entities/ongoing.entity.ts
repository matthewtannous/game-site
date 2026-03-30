import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { GameState } from '../../common/enums/game-state.enum';
import { Game } from '../../common/enums/game.enum';

@Entity('ongoing')
export class Ongoing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'player1_id' })
  player1Id: number;

  @Column({ name: 'player2_id' })
  player2Id: number;

  @Column({
    name: 'game_type',
    type: 'enum',
    enum: Game,
    enumName: 'game',
  })
  gameType: Game;

  @Column('simple-array')
  moves: number[];

  @Column({ name: 'last_move_played_at' })
  lastMovePlayedAt: Date;

  @Column({
    name: 'state',
    type: 'enum',
    enum: GameState,
    enumName: 'game_state',
    default: GameState.ongoing,
  })
  state: GameState;
}
