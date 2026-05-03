import { Injectable } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { DetailedGameDto } from './dto/detailed-game.dto';
import { MoveDto } from './dto/move.input';
import { UpdateStateDto } from './dto/update-state.input';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}

  async create(createGameInput: CreateGameInput) {
    const result = await this.gamesRepository.save(createGameInput);
    return this.gamesRepository.findOneBy({ id: result.id });
  }

  findAll() {
    return this.gamesRepository.find();
  }

  findOne(id: number) {
    return this.gamesRepository.findOneBy({ id: id });
  }

  async update(id: number, updateGameInput: UpdateGameInput) {
    await this.gamesRepository.update(id, updateGameInput);
    return this.gamesRepository.findOneBy({ id: id });
  }

  async remove(id: number) {
    const result = await this.gamesRepository.findOneBy({ id: id });
    this.gamesRepository.delete(id);
    return result;
  }

  async findOneDetailed(id: number) {
    const result: DetailedGameDto[] = await this.gamesRepository.query(
      `
        SELECT
          g.id                      AS "id",
          g.player1_id              AS "player1Id",
          s.username                AS "player1Name",
          g.player2_id              AS "player2Id",
          r.username                AS "player2Name",
          g.game_type               AS "gameType",
          g.moves                   AS "moves",
          g.last_move_played_at     AS "lastMovePlayedAt",
          g.state                   AS "state"
        FROM games g
        JOIN users s ON s.id = g.player1_id
        JOIN users r ON r.id = g.player2_id
        WHERE g.id = $1;
      `,
      [id],
    );

    return result[0];
  }

  async findAllForPlayer(playerId: number) {
    const result: DetailedGameDto[] = await this.gamesRepository.query(
      `
        SELECT
          g.id                      AS "id",
          g.player1_id              AS "player1Id",
          s.username                AS "player1Name",
          g.player2_id              AS "player2Id",
          r.username                AS "player2Name",
          g.game_type               AS "gameType",
          g.moves                   AS "moves",
          g.last_move_played_at     AS "lastMovePlayedAt",
          g.state                   AS "state"
        FROM games g
        JOIN users s ON s.id = g.player1_id
        JOIN users r ON r.id = g.player2_id
        WHERE g.player1_id = $1 OR g.player2_id = $1
        ORDER BY g.last_move_played_at ASC;
      `,
      [playerId],
    );

    return result;
  }

  async addMove(moveDto: MoveDto) {
    await this.gamesRepository
      .createQueryBuilder('ongoing')
      .update(Game)
      .set({ moves: () => 'array_append(moves, :move::int)' })
      .where('id = :id', { id: moveDto.gameId })
      .setParameters({ move: moveDto.move })
      .returning('*')
      .execute();

    // this.gamesGateway.emitGameUpdate(moveDto.gameId, result.raw[0]);

    return this.gamesRepository.findOneBy({ id: moveDto.gameId });
  }

  async updateState(updateStateDto: UpdateStateDto) {
    await this.gamesRepository.update(updateStateDto.gameId, {
      state: updateStateDto.state,
    });

    return this.gamesRepository.findOneBy({ id: updateStateDto.gameId });
  }
}
