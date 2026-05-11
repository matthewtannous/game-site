import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** User account */
@Entity('users')
@ObjectType()
export class User {
  /** Unique integer ID */
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id!: number;

  /** Unique username */
  @Column({ unique: true })
  username!: string;

  /** Email address */
  @Column()
  email!: string;

  /** Strong password (encrypted) */
  @Column()
  password!: string;

  /** Time of account creation */
  @Column({ type: 'date', name: 'created_at' })
  createdAt!: Date;
}
