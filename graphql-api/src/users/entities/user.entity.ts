import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  /** Unique integer id */
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date', name: 'created_at' })
  createdAt: Date;
}
