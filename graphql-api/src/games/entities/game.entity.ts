import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GameState } from 'src/common/enums/game-state.enum';
import { GameType } from 'src/common/enums/game-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/** A game being played or finished */
@Entity('games')
@ObjectType()
export class Game {
  /** Unique integer ID */
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  /** Player 1's unique integer ID */
  @Field((type) => Int)
  @Column({ name: 'player1_id' })
  player1Id!: number;

  /** Player 2's unique integer ID */
  @Field((type) => Int)
  @Column({ name: 'player2_id' })
  player2Id!: number;

  /** Type of game being played */
  @Column({
    name: 'game_type',
    type: 'enum',
    enum: GameType,
    enumName: 'game',
  })
  gameType!: GameType;

  /**
   * All moves that happened until now
   * Moves are stored as integers in order of time played
   * so player1 makes the move at moves[0], player2 at moves[1]...
   */
  @Field((type) => [Int])
  @Column('simple-array')
  moves!: number[];

  /** Time of last move being played */
  @Column({ name: 'last_move_played_at' })
  lastMovePlayedAt!: Date;

  /** Current state of the game */
  @Column({
    name: 'state',
    type: 'enum',
    enum: GameState,
    enumName: 'game_state',
    default: GameState.ongoing,
  })
  state!: GameState;
}
