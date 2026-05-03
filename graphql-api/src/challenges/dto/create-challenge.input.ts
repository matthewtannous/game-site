import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameType } from '../../common/enums/game-type.enum';

@InputType()
export class CreateChallengeInput {
  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  senderId: number;

  @Field(() => Int)
  @IsPositive()
  @IsNotEmpty()
  receiverId: number;

  @IsEnum(GameType)
  @IsNotEmpty()
  gameType: GameType;
}
