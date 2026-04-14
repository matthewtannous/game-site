import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Game } from './entities/game.entity';
import { DetailedGameDto } from './dto/detailed-game.dto';
import { MoveDto } from './dto/move.dto';
import { DetailedGameNoMovesDto } from './dto/detailed-game-no-moves.dto';

import { UpdateStateDto } from './dto/update-state.dto';
import { GamesGateway } from './games.gateway';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
    private readonly gamesGateway: GamesGateway,
  ) {}

  create(createGameDto: CreateGameDto) {
    return this.gamesRepository.save(createGameDto);
  }

  findAll() {
    return this.gamesRepository.find();
  }

  findOne(id: number) {
    return this.gamesRepository.findOneBy({ id: id });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.gamesRepository.update(id, updateGameDto);
  }

  remove(id: number) {
    return this.gamesRepository.delete(id);
  }

  async findAllDetailed() {
    const result: DetailedGameDto[] = await this.gamesRepository.query(`
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
        ORDER BY g.last_move_played_at DESC;
      `);

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

  async findAllOneUser(id: number): Promise<DetailedGameDto[]> {
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
      [id],
    );

    return result;
  }

  async findAllOneUserNoMoves(id: number): Promise<DetailedGameNoMovesDto[]> {
    const result: DetailedGameNoMovesDto[] = await this.gamesRepository.query(
      `
        SELECT
          g.id                      AS "id",
          g.player1_id              AS "player1Id",
          s.username                AS "player1Name",
          g.player2_id              AS "player2Id",
          r.username                AS "player2Name",
          g.game_type               AS "gameType",
          g.last_move_played_at     AS "lastMovePlayedAt",
          g.state                   AS "state"
        FROM games g
        JOIN users s ON s.id = g.player1_id
        JOIN users r ON r.id = g.player2_id
        WHERE g.player1_id = $1 OR g.player2_id = $1
        ORDER BY g.last_move_played_at DESC;
      `,
      [id],
    );

    return result;
  }

  async addMove(moveDto: MoveDto) {
    const result: UpdateResult = await this.gamesRepository
      .createQueryBuilder('ongoing')
      .update(Game)
      .set({ moves: () => 'array_append(moves, :move::int)' })
      .where('id = :id', { id: moveDto.gameId })
      .setParameters({ move: moveDto.move })
      .returning('*')
      .execute();

    this.gamesGateway.emitGameUpdate(moveDto.gameId, result.raw[0]);

    return result ? result.raw[0] : null;
  }

  async updateState(updateStateDto: UpdateStateDto) {
    return this.gamesRepository.update(updateStateDto.gameId, {
      state: updateStateDto.state,
    });
  }
}
