import { Injectable } from '@nestjs/common';
import { BasicGameDto } from './dto/basic-game.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/ongoing.entity';
import { DetailedGameDto } from './dto/detailed-game.dto';
import { MoveDto } from './dto/move.dto';
import { DetailedGameNoMovesDto } from './dto/detailed-game-no-moves.dto';

import { UpdateStateDto } from './dto/update-state.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  create(basicGameDto: BasicGameDto) {
    return this.gamesRepository.save(basicGameDto);
  }

  findAll() {
    return this.gamesRepository.find();
  }

  findOne(id: number) {
    return this.gamesRepository.findOneBy({ id: id });
  }

  update(id: number, basicGameDto: BasicGameDto) {
    return this.gamesRepository.update(id, basicGameDto);
  }

  remove(id: number) {
    return this.gamesRepository.delete(id);
  }

  async findAllDetailed() {
    const result = await this.gamesRepository.query(`
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
        JOIN users r ON r.id = g.player2_id;
      `);

    return result as DetailedGameDto[];
  }

  async findOneDetailed(id: number) {
    const result = await this.gamesRepository.query(
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

    return result[0] as DetailedGameDto;
  }

  async findAllOneUser(id: number): Promise<DetailedGameDto[]> {
    const result = await this.gamesRepository.query(
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
        WHERE g.player1_id = $1 OR g.player2_id = $1;
      `,
      [id],
    );

    return result as DetailedGameDto[];
  }

  async findAllOneUserNoMoves(id: number): Promise<DetailedGameNoMovesDto[]> {
    const result = await this.gamesRepository.query(
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

    return result as DetailedGameNoMovesDto[];
  }

  async addMove(moveDto: MoveDto) {
    const result = await this.gamesRepository
      .createQueryBuilder('ongoing')
      .update(Game)
      .set({ moves: () => 'array_append(moves, :move::int)' })
      .where('id = :id', { id: moveDto.gameId })
      .setParameters({ move: moveDto.move })
      .execute();

    return result ? result : null;
  }

  async updateState(updateStateDto: UpdateStateDto) {
    return this.gamesRepository.update(updateStateDto.gameId, {
      state: updateStateDto.state,
    });
  }
}
