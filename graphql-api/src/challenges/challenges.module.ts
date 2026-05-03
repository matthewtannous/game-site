import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesResolver } from './challenges.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { GamesModule } from 'src/games/games.module';

@Module({
  providers: [ChallengesResolver, ChallengesService],
  imports: [TypeOrmModule.forFeature([Challenge]), GamesModule],
})
export class ChallengesModule {}
