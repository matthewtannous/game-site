import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

// For database
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
  ) {}

  create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    return this.challengesRepository.save(createChallengeDto);
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

  async remove(id: number) {
    await this.challengesRepository.delete(id);
  }
}
