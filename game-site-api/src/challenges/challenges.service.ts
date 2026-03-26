import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { DetailedChallengeDto } from './dto/detailed-challenge.dto';

// For database
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';

import { OngoingService } from '../ongoing/ongoing.service';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
    private ongoingService: OngoingService,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    try {
      return await this.challengesRepository.save(createChallengeDto);
    } catch {
      throw new HttpException(
        'Challenge already exists',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  findAll(): Promise<Challenge[]> {
    return this.challengesRepository.find();
  }

  findOne(id: number): Promise<Challenge | null> {
    return this.challengesRepository.findOneBy({ id: id });
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return this.challengesRepository.update(id, updateChallengeDto);
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
        g.name             AS "gameName",
        c.created_at       AS "createdAt"
      FROM challenges c
      JOIN users s ON s.id = c.sender_id
      JOIN users r ON r.id = c.receiver_id
      JOIN games g ON g.id = c.game_type
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
        g.name             AS "gameName",
        c.created_at       AS "createdAt"
      FROM challenges c
      JOIN users s ON s.id = c.sender_id
      JOIN users r ON r.id = c.receiver_id
      JOIN games g ON g.id = c.game_type
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
        g.name             AS "gameName",
        c.created_at       AS "createdAt"
      FROM challenges c
      JOIN users s ON s.id = c.sender_id
      JOIN users r ON r.id = c.receiver_id
      JOIN games g ON g.id = c.game_type
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
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    // convert challenge to ongoing
    const ongoing = {
      player1Id: challenge.senderId,
      player2Id: challenge.receiverId,
      gameType: challenge.gameType,
    };

    // Remove challenge from challenges repository
    this.challengesRepository.delete(id);

    // Add challenge to ongoing games repository
    this.ongoingService.create(ongoing);

    return ongoing; // ??
  }
}
