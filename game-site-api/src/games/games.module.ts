import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameController } from './games.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/ongoing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
  providers: [GamesService],

  exports: [GamesService],
})
export class GameModule {}
