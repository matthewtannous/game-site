import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { GameType } from '../../common/enums/game-type.enum';

@Entity('statistics')
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'player1_id' })
  player1Id: number;

  @Column({ name: 'player2_id' })
  player2Id: number;

  @Column({
    name: 'game_type',
    type: 'enum',
    enum: GameType,
    enumName: 'game',
  })
  gameType: GameType;

  @Column({ name: 'player1_wins', default: 0 })
  player1Wins: number;

  @Column({ name: 'player2_wins', default: 0 })
  player2Wins: number;

  @Column({ default: 0 })
  draws: number;
}
