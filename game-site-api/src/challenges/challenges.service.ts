import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { DetailedChallengeDto } from './dto/detailed-challenge.dto';

// For database
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';

import { GamesService } from '../games/games.service';
import { DatabaseException } from 'src/common/exceptions/database.exception';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
    private gamesService: GamesService,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    try {
      return await this.challengesRepository.save(createChallengeDto);
    } catch {
      throw new DatabaseException('Challenge already exists');
    }
  }

  findAll(): Promise<Challenge[]> {
    return this.challengesRepository.find();
  }

  findOne(id: number): Promise<Challenge | null> {
    return this.challengesRepository.findOneBy({ id: id });
  }

  async update(id: number, updateChallengeDto: UpdateChallengeDto) {
    try {
      return await this.challengesRepository.update(id, updateChallengeDto);
    } catch (error) {
      throw new DatabaseException('Challenge already exists');
    }
  }

  remove(id: number) {
    return this.challengesRepository.delete(id);
  }

  async findAllDetailed() {
    const result = await this.challengesRepository.query(`
      SELECT
        c.id               AS "id",
        c.sender_id        AS "senderId",
        s.username         AS "senderName",
        c.receiver_id      AS "receiverId",
        r.username         AS "receiverName",
        c.game_type        AS "gameType",
        c.created_at       AS "createdAt"
      FROM challenges c
      JOIN users s ON s.id = c.sender_id
      JOIN users r ON r.id = c.receiver_id
      ORDER BY c.created_at DESC;
    `);

    return result as DetailedChallengeDto[];
  }

  async findAllReceived(id: number) {
    const result = await this.challengesRepository.query(
      `
      SELECT
        c.id               AS "id",
        c.sender_id        AS "senderId",
        s.username         AS "senderName",
        c.receiver_id      AS "receiverId",
        r.username         AS "receiverName",
        c.game_type        AS "gameType",
        c.created_at       AS "createdAt"
      FROM challenges c
      JOIN users s ON s.id = c.sender_id
      JOIN users r ON r.id = c.receiver_id
      WHERE c.receiver_id = $1
      ORDER BY c.created_at DESC;
    `,
      [id],
    );

    return result as DetailedChallengeDto[];
  }

  async findAllSent(id: number) {
    const result = await this.challengesRepository.query(
      `
      SELECT
        c.id               AS "id",
        c.sender_id        AS "senderId",
        s.username         AS "senderName",
        c.receiver_id      AS "receiverId",
        r.username         AS "receiverName",
        c.game_type        AS "gameType",
        c.created_at       AS "createdAt"
      FROM challenges c
      JOIN users s ON s.id = c.sender_id
      JOIN users r ON r.id = c.receiver_id
      WHERE c.sender_id = $1
      ORDER BY c.created_at DESC;
    `,
      [id],
    );

    return result as DetailedChallengeDto[];
  }

  async accept(id: number) {
    // save challenge
    const challenge = await this.challengesRepository.findOneBy({ id: id });
    if (!challenge) {
      throw new DatabaseException('Not found');
    }
    // convert challenge to ongoing
    const newGame = {
      player1Id: challenge.senderId,
      player2Id: challenge.receiverId,
      gameType: challenge.gameType,
    };

    // Remove challenge from challenges repository
    this.challengesRepository.delete(id);

    // Add challenge to ongoing games repository
    this.gamesService.create(newGame);

    return newGame; // not needed ?
  }
}
