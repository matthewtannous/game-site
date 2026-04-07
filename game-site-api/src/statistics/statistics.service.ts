import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistic } from './entities/statistic.entity';
import { IncrementStatisticDto } from './dto/increment-statistic.dto';
import { DatabaseException } from 'src/common/exceptions/database.exception';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistic)
    private statisticsRepository: Repository<Statistic>,
  ) {}

  async create(createStatisticDto: CreateStatisticDto) {
    // make sure id1 < id2
    if (createStatisticDto.player1Id > createStatisticDto.player2Id) {
      const temp = createStatisticDto.player1Id;
      createStatisticDto.player1Id = createStatisticDto.player2Id;
      createStatisticDto.player2Id = temp;
    }
    try {
      return await this.statisticsRepository.save(createStatisticDto);
    } catch {
      throw new DatabaseException('statistics.service create ERROR');
    }
  }

  findAll() {
    return this.statisticsRepository.find();
  }

  findOne(id: number) {
    return this.statisticsRepository.findOneBy({ id: id });
  }

  update(id: number, updateStatisticDto: UpdateStatisticDto) {
    // make sure id1 < id2
    if (updateStatisticDto.player1Id > updateStatisticDto.player2Id) {
      const temp = updateStatisticDto.player1Id;
      updateStatisticDto.player1Id = updateStatisticDto.player2Id;
      updateStatisticDto.player2Id = temp;
    }
    return this.statisticsRepository.update(id, updateStatisticDto);
  }

  remove(id: number) {
    return this.statisticsRepository.delete(id);
  }

  async increment(incrementStatisticDto: IncrementStatisticDto) {
    // Create row if it does not exist
    if (incrementStatisticDto.player1Id > incrementStatisticDto.player2Id) {
      const temp = incrementStatisticDto.player1Id;
      incrementStatisticDto.player1Id = incrementStatisticDto.player2Id;
      incrementStatisticDto.player2Id = temp;
    }
    if (
      !(await this.statisticsRepository.findOneBy({
        player1Id: incrementStatisticDto.player1Id,
        player2Id: incrementStatisticDto.player2Id,
        gameType: incrementStatisticDto.gameType,
      }))
    ) {
      await this.statisticsRepository.save(incrementStatisticDto);
    }

    // update row
    return this.statisticsRepository.increment(
      {
        player1Id: incrementStatisticDto.player1Id,
        player2Id: incrementStatisticDto.player2Id,
        gameType: incrementStatisticDto.gameType,
      },
      incrementStatisticDto.statistic,
      1,
    );
  }
}
