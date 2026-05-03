import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChallengesService } from './challenges.service';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { DetailedChallengeDto } from './dto/detailed-challenge.dto';
import { Game } from 'src/games/entities/game.entity';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly challengesService: ChallengesService) {}

  @Mutation(() => Challenge)
  createChallenge(
    @Args('createChallengeInput') createChallengeInput: CreateChallengeInput,
  ) {
    return this.challengesService.create(createChallengeInput);
  }

  @Query(() => [Challenge], { name: 'challenges' })
  findAll() {
    return this.challengesService.findAll();
  }

  @Query(() => Challenge, { name: 'challenge' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.challengesService.findOne(id);
  }

  @Query(() => [DetailedChallengeDto], { name: 'detailedChallenges' })
  findDetailedForPlayer(
    @Args('playerId', { type: () => Int }) playerId: number,
    @Args('sent', { type: () => Boolean }) sent: boolean,
  ) {
    return this.challengesService.findAllForPlayer(playerId, sent);
  }

  @Mutation(() => Challenge)
  updateChallenge(
    @Args('updateChallengeInput') updateChallengeInput: UpdateChallengeInput,
  ) {
    return this.challengesService.update(
      updateChallengeInput.id,
      updateChallengeInput,
    );
  }

  @Mutation(() => Challenge)
  removeChallenge(@Args('id', { type: () => Int }) id: number) {
    return this.challengesService.remove(id);
  }

  @Mutation(() => Game)
  acceptChallenge(@Args('id', { type: () => Int }) id: number) {
    return this.challengesService.accept(id);
  }
}
