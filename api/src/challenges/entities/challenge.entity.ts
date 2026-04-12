import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { GameType } from '../../common/enums/game-type.enum';

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
    enum: GameType,
    enumName: 'game',
  })
  gameType: GameType;

  @Column({ type: 'time with time zone', name: 'created_at' })
  createdAt: Date;
}
