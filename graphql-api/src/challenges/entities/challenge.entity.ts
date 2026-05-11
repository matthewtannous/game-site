import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { GameType } from '../../common/enums/game-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** A challenge sent from one user to another for a specific game */
@Entity('challenges')
@ObjectType()
export class Challenge {
  /** Unique integer ID */
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id!: number;

  /** Sender's unique ID */
  @Field((type) => Int)
  @Column({ name: 'sender_id' })
  senderId!: number;

  /** Receiver's unique ID */
  @Field((type) => Int)
  @Column({ name: 'receiver_id' })
  receiverId!: number;

  /** Type of game */
  @Column({
    name: 'game_type',
    type: 'enum',
    enum: GameType,
    enumName: 'game',
  })
  gameType!: GameType;

  /** Time of challenge creation */
  @Column({ type: 'time with time zone', name: 'created_at' })
  createdAt!: Date;
}
