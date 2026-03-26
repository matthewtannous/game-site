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
import { CreateOngoingDto } from './dto/create-ongoing.dto';
import { UpdateOngoingDto } from './dto/update-ongoing.dto';

@Controller('ongoing')
export class OngoingController {
  constructor(private readonly ongoingService: OngoingService) { }

  @Post()
  create(@Body() createOngoingDto: CreateOngoingDto) {
    return this.ongoingService.create(createOngoingDto);
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
    @Body() updateOngoingDto: UpdateOngoingDto,
  ) {
    return this.ongoingService.update(id, updateOngoingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ongoingService.remove(id);
  }
}
