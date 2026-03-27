import { Injectable } from '@nestjs/common';
import { BasicOngoingDto } from './dto/basic-ongoing.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ongoing } from './entities/ongoing.entity';
import { DetailedOngoingDto } from './dto/detailed-ongoing.dto';
import { MoveDto } from './dto/move.dto';

@Injectable()
export class OngoingService {
  constructor(
    @InjectRepository(Ongoing)
    private ongoingRepository: Repository<Ongoing>,
  ) {}

  create(basicOngoingDto: BasicOngoingDto) {
    return this.ongoingRepository.save(basicOngoingDto);
  }

  findAll() {
    return this.ongoingRepository.find();
  }

  findOne(id: number) {
    return this.ongoingRepository.findOneBy({ id: id });
  }

  update(id: number, basicOngoingDto: BasicOngoingDto) {
    return this.ongoingRepository.update(id, basicOngoingDto);
  }

  remove(id: number) {
    return this.ongoingRepository.delete(id);
  }

  async findAllDetailed() {
    const result = await this.ongoingRepository.query(`
        SELECT
          o.id                      AS "id",
          o.player1_id              AS "player1Id",
          s.username                AS "player1Name",
          o.player2_id              AS "player2Id",
          r.username                AS "player2Name",
          o.game_type               AS "gameType",
          g.name                    AS "gameName",
          o.moves                   AS "moves",
          o.last_move_played_at    AS "lastMovePlayedAt"
        FROM ongoing o
        JOIN users s ON s.id = o.player1_id
        JOIN users r ON r.id = o.player2_id
        JOIN games g ON g.id = o.game_type;
      `);

    return result as DetailedOngoingDto[];
  }

  async findAllOneUser(id: number): Promise<DetailedOngoingDto[]> {
    const result = await this.ongoingRepository.query(
      `
        SELECT
          o.id                      AS "id",
          o.player1_id              AS "player1Id",
          s.username                AS "player1Name",
          o.player2_id              AS "player2Id",
          r.username                AS "player2Name",
          o.game_type               AS "gameType",
          g.name                    AS "gameName",
          o.moves                   AS "moves",
          o.last_move_played_at    AS "lastMovePlayedAt"
        FROM ongoing o
        JOIN users s ON s.id = o.player1_id
        JOIN users r ON r.id = o.player2_id
        JOIN games g ON g.id = o.game_type
        WHERE o.player1_id = $1 OR o.player2_id = $1;
      `,
      [id],
    );

    return result as DetailedOngoingDto[];
  }

  async addMove(moveDto: MoveDto) {
    // find game with id
    const result = await this.ongoingRepository
      .createQueryBuilder('ongoing')
      .update(Ongoing)
      .set({ moves: () => 'array_append(moves, :move::int)' })
      .where('id = :id', { id: moveDto.gameId })
      .setParameters({ move: moveDto.move })
      .execute();

    return result ? result : null;
  }
}
