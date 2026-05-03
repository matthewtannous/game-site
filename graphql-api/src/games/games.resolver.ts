import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { DetailedGameDto } from './dto/detailed-game.dto';
import { MoveDto } from './dto/move.input';
import { UpdateStateDto } from './dto/update-state.input';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  createGame(@Args('createGameInput') createGameInput: CreateGameInput) {
    return this.gamesService.create(createGameInput);
  }

  @Query(() => [Game], { name: 'games' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gamesService.findOne(id);
  }

  @Mutation(() => Game)
  updateGame(@Args('updateGameInput') updateGameInput: UpdateGameInput) {
    return this.gamesService.update(updateGameInput.id, updateGameInput);
  }

  @Mutation(() => Game)
  removeGame(@Args('id', { type: () => Int }) id: number) {
    return this.gamesService.remove(id);
  }

  @Query(() => [DetailedGameDto], { name: 'detailedGamesForPlayer' })
  findAllForPlayer(@Args('playerId', { type: () => Int }) id: number) {
    return this.gamesService.findAllForPlayer(id);
  }

  @Query(() => DetailedGameDto, { name: 'detailedGame' })
  findOneDetailed(@Args('id', { type: () => Int }) id: number) {
    return this.gamesService.findOneDetailed(id);
  }

  @Mutation(() => Game)
  addMove(@Args('moveDto') moveDto: MoveDto) {
    return this.gamesService.addMove(moveDto);
  }

  @Mutation(() => Game, { name: 'updateGameState' })
  updateState(@Args('updateStateDto') updateStateDto: UpdateStateDto) {
    return this.gamesService.updateState(updateStateDto);
  }
}
