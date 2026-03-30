import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../common/enums/game.enum';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sender_id' })
  senderId: number;

  @Column({ name: 'receiver_id' })
  receiverId: number;

  @Column({
    name: 'game_type',
    type: 'enum',
    enum: Game,
    enumName: 'game',
  })
  gameType: Game;

  @Column({ type: 'time with time zone', name: 'created_at' })
  createdAt: Date;
}
