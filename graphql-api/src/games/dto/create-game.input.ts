import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsPositive } from 'class-validator';
import { GameType } from 'src/common/enums/game-type.enum';

@InputType()
export class CreateGameInput {
  @Field((type) => Int)
  @IsPositive()
  @IsNotEmpty()
  player1Id: number;

  @Field((type) => Int)
  @IsPositive()
  @IsNotEmpty()
  player2Id: number;

  @IsEnum(GameType)
  @IsNotEmpty()
  gameType: GameType;
}
