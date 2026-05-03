import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { GameType } from '../../common/enums/game-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('challenges')
@ObjectType()
export class Challenge {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  @Column({ name: 'sender_id' })
  senderId: number;

  @Field((type) => Int)
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
