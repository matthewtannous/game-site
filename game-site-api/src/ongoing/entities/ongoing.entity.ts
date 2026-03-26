import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
