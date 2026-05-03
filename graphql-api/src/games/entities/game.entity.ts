import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GameState } from 'src/common/enums/game-state.enum';
import { GameType } from 'src/common/enums/game-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('games')
@ObjectType()
export class Game {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column({ name: 'player1_id' })
  player1Id: number;

  @Field((type) => Int)
  @Column({ name: 'player2_id' })
  player2Id: number;

  @Column({
    name: 'game_type',
    type: 'enum',
    enum: GameType,
    enumName: 'game',
  })
  gameType: GameType;

  @Field((type) => [Int])
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
