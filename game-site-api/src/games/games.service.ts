import { Injectable } from '@nestjs/common';
import { GameDto } from './dto/game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  create(gameDto: GameDto) {
    return this.gamesRepository.save(gameDto);
  }

  findAll() {
    return this.gamesRepository.find();
  }

  findOne(id: number) {
    return this.gamesRepository.findOneBy({ id: id });
  }

  update(id: number, gameDto: GameDto) {
    return this.gamesRepository.update(id, gameDto);
  }

  remove(id: number) {
    this.gamesRepository.delete(id);
  }
}
