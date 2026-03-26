import { Injectable } from '@nestjs/common';
import { CreateOngoingDto } from './dto/create-ongoing.dto';
import { UpdateOngoingDto } from './dto/update-ongoing.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ongoing } from './entities/ongoing.entity';
import { DetailedOngoingDto } from './dto/detailed-ongoing.dto';

@Injectable()
export class OngoingService {
  constructor(
    @InjectRepository(Ongoing)
    private ongoingRepository: Repository<Ongoing>,
  ) {}

  create(createOngoingDto: CreateOngoingDto) {
    return this.ongoingRepository.save(createOngoingDto);
  }

  findAll() {
    return this.ongoingRepository.find();
  }

  findOne(id: number) {
    return this.ongoingRepository.findOneBy({ id: id });
  }

  update(id: number, updateOngoingDto: UpdateOngoingDto) {
    return this.ongoingRepository.update(id, updateOngoingDto);
  }

  remove(id: number) {
    return this.ongoingRepository.delete(id);
  }

  async findAllDetailed() {
    const result = await this.ongoingRepository.query(`
        SELECT
          o.id               AS "id",
          o.player1_id       AS "player1Id",
          s.username         AS "player1Name",
          o.player2_id       AS "player2Id",
          r.username         AS "player2Name",
          o.game_type        AS "gameType",
          g.name             AS "gameName"
        FROM ongoing o
        JOIN users s ON s.id = o.player1_id
        JOIN users r ON r.id = o.player2_id
        JOIN games g ON g.id = o.game_type;
      `);

    return result as DetailedOngoingDto[];
  }

  async findAllOneUser(id: number) {
    const result = await this.ongoingRepository.query(
      `
        SELECT
          o.id               AS "id",
          o.player1_id       AS "player1Id",
          s.username         AS "player1Name",
          o.player2_id       AS "player2Id",
          r.username         AS "player2Name",
          o.game_type        AS "gameType",
          g.name             AS "gameName"
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
}
