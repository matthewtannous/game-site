import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { DetailedChallengeDto } from './dto/detailed-challenge.dto';

// For database
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';

import { GamesService } from '../games/games.service';
import { DatabaseException } from 'src/common/exceptions/database.exception';

import { ChallengeGateway } from './challenges.gateway';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengesRepository: Repository<Challenge>,
    private readonly gamesService: GamesService,
    private readonly challengeGateway: ChallengeGateway,
  ) { }

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    try {
      const result = await this.challengesRepository.save(createChallengeDto);

      // Find full challenge to emit
      const challenge = await this.challengesRepository.findOneBy({ id: result.id });
      this.challengeGateway.emitChallengeCreated(result.id, challenge);

      return result;
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
      const result = await this.challengesRepository.update(id, updateChallengeDto);

      // Emit
      this.challengeGateway.emitChallengeUpdated(id,
        await this.challengesRepository.findOneBy({ id: id }));

      return result;
    } catch {
      throw new DatabaseException('Challenge already exists');
    }
  }

  remove(id: number) {
    this.challengeGateway.emitChallengeDeleted(id);
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
    await this.challengesRepository.delete(id);

    // Add challenge to ongoing games repository
    await this.gamesService.create(newGame);

    return newGame; // not needed ?
  }
}
