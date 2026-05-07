import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GamesGateway } from './games.gateway';

@Module({
  providers: [GamesResolver, GamesService, GamesGateway],
  imports: [TypeOrmModule.forFeature([Game])],

  exports: [GamesService],
})
export class GamesModule {}
