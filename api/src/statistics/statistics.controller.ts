import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { IncrementStatisticDto } from './dto/increment-statistic.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post()
  create(@Body() createStatisticDto: CreateStatisticDto) {
    return this.statisticsService.create(createStatisticDto);
  }

  @Get()
  findAll() {
    return this.statisticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.statisticsService.findOne(id);
  }

  @Put('increment')
  increment(@Body() incrementStatisticDto: IncrementStatisticDto) {
    return this.statisticsService.increment(incrementStatisticDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatisticDto: UpdateStatisticDto,
  ) {
    return this.statisticsService.update(id, updateStatisticDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.statisticsService.remove(id);
  }
}
