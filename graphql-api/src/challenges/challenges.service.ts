import { Injectable } from '@nestjs/common';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { Repository } from 'typeorm';
import { DatabaseException } from '../common/exceptions/database.exception';
import { DetailedChallengeDto } from './dto/detailed-challenge.dto';
import { GamesService } from '../games/games.service';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengesRepository: Repository<Challenge>,
    private readonly gamesService: GamesService,
  ) {}

  async create(createChallengeInput: CreateChallengeInput) {
    try {
      const result = await this.challengesRepository.save(createChallengeInput);

      // // Find full challenge to emit
      // const challenge = await this.challengesRepository.findOneBy({
      //   id: result.id,
      // });
      // this.challengeGateway.emitChallengeUpdate(result.id, challenge);

      return this.challengesRepository.findOneBy({ id: result.id });
    } catch {
      throw new DatabaseException('Challenge already exists');
    }
  }

  findAll() {
    return this.challengesRepository.find();
  }

  findOne(id: number) {
    return this.challengesRepository.findOneBy({ id: id });
  }

  async update(id: number, updateChallengeInput: UpdateChallengeInput) {
    try {
      await this.challengesRepository.update(id, updateChallengeInput);

      // // Emit
      // this.challengeGateway.emitChallengeUpdate(
      //   id,
      //   await this.challengesRepository.findOneBy({ id: id }),
      // );

      return this.challengesRepository.findOneBy({ id: id });
    } catch {
      throw new DatabaseException('Challenge already exists');
    }
  }

  async remove(id: number) {
    const result = await this.challengesRepository.findOneBy({ id: id });
    this.challengesRepository.delete(id);
    return result;
  }

  /** Finds all challenges that a player has */
  async findAllForPlayer(playerId: number, sent: boolean) {
    const param = sent ? 'c.sender_id' : 'c.receiver_id';
    const result: DetailedChallengeDto[] =
      await this.challengesRepository.query(
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
      WHERE ${param} = $1
      ORDER BY c.created_at DESC;
    `,
        [playerId],
      );

    return result;
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
    const result = await this.gamesService.create(newGame);

    return result;
  }
}
