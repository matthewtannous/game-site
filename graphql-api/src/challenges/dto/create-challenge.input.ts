import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';

/** Information to be passed when creating a Challenge */
@InputType()
export class CreateChallengeInput {
  /** Sender's unique ID */
  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  senderId!: number;

  /** Receiver's unique ID */
  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  receiverId!: number;

  /** Type of game */
  @IsEnum(GameType)
  @IsNotEmpty()
  gameType!: GameType;
}
