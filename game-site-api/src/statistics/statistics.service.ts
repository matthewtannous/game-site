import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistic } from './entities/statistic.entity';
import { IncrementStatisticDto } from './dto/increment-statistic.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistic)
    private statisticsRepository: Repository<Statistic>
  ) { }

  create(createStatisticDto: CreateStatisticDto) {
    return this.statisticsRepository.save(createStatisticDto);
  }

  findAll() {
    return this.statisticsRepository.find();
  }

  findOne(id: number) {
    return this.statisticsRepository.findOneBy({ id: id });
  }

  update(id: number, updateStatisticDto: UpdateStatisticDto) {
    return this.statisticsRepository.update(id, updateStatisticDto);
  }

  remove(id: number) {
    return this.statisticsRepository.delete(id);
  }

  increment(incrementStatisticDto: IncrementStatisticDto) {
    return this.statisticsRepository.increment(
      {
        player1Id: incrementStatisticDto.player1Id,
        player2Id: incrementStatisticDto.player2Id,
        gameType: incrementStatisticDto.gameType
      },
      incrementStatisticDto.statistic, 1);
  }
}
