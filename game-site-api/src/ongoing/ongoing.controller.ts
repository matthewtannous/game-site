import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OngoingService } from './ongoing.service';
import { BasicOngoingDto } from './dto/basic-ongoing.dto';
import { MoveDto } from './dto/move.dto';

@Controller('ongoing')
export class OngoingController {
  constructor(private readonly ongoingService: OngoingService) {}

  @Post()
  create(@Body() basicOngoingDto: BasicOngoingDto) {
    return this.ongoingService.create(basicOngoingDto);
  }

  @Get()
  findAll() {
    return this.ongoingService.findAll();
  }

  @Get('detailed')
  findAllDetailed() {
    return this.ongoingService.findAllDetailed();
  }

  @Get('detailed/:id')
  findAllOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.ongoingService.findAllOneUser(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ongoingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() basicOngoingDto: BasicOngoingDto,
  ) {
    return this.ongoingService.update(id, basicOngoingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ongoingService.remove(id);
  }

  @Post('play')
  addMove(@Body() moveDto: MoveDto) {
    return this.ongoingService.addMove(moveDto);
  }
}
