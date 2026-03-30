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
import { GamesService } from './games.service';
import { BasicGameDto } from './dto/basic-game.dto';
import { MoveDto } from './dto/move.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() basicGameDto: BasicGameDto) {
    return this.gamesService.create(basicGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('detailed')
  findAllDetailed() {
    return this.gamesService.findAllDetailed();
  }

  @Get('detailed/:id')
  findOneDetailed(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findOneDetailed(id);
  }

  @Get('user/:id')
  findAllOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findAllOneUser(id);
  }

  @Get('user-no-moves/:id')
  findAllOneUserNoMoves(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findAllOneUserNoMoves(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() basicGameDto: BasicGameDto,
  ) {
    return this.gamesService.update(id, basicGameDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.remove(id);
  }

  @Post('play')
  addMove(@Body() moveDto: MoveDto) {
    return this.gamesService.addMove(moveDto);
  }

  @Put('/state')
  updateState(@Body() body: UpdateStateDto) {
    return this.gamesService.updateState(body);
  }
}
