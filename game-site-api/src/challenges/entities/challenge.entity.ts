import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sender_id' })
  senderId: number;

  @Column({ name: 'receiver_id' })
  receiverId: number;

  @Column({ name: 'game_type' })
  gameType: number;

  @Column({ type: 'time with time zone', name: 'created_at' })
  createdAt: Date;
}
