import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { OngoingService } from './ongoing.service';
import { BasicOngoingDto } from './dto/basic-ongoing.dto';
import { MoveDto } from './dto/move.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('ongoing')
export class OngoingController {
  constructor(private readonly ongoingService: OngoingService) { }

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
  findOneDetailed(@Param('id', ParseIntPipe) id: number) {
    return this.ongoingService.findOneDetailed(id);
  }

  @Get('user/:id')
  findAllOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.ongoingService.findAllOneUser(id);
  }

  @Get('user-no-moves/:id')
  findAllOneUserNoMoves(@Param('id', ParseIntPipe) id: number) {
    return this.ongoingService.findAllOneUserNoMoves(id);
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

  @Put('/state')
  updateState(
    @Body() body: UpdateStateDto,
  ) {
    return this.ongoingService.updateState(body);
  }
}
