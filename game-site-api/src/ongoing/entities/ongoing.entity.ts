import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum GameState {
  ongoing = "ongoing",
  tie = 'tie',
  player1Won = 'player1_won',
  player2Won = 'player2_won',
}

@Entity('ongoing')
export class Ongoing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'player1_id' })
  player1Id: number;

  @Column({ name: 'player2_id' })
  player2Id: number;

  @Column({ name: 'game_type' })
  gameType: number;

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
