import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengeGateway } from './challenges.gateway';

// For database
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';

import { GameModule } from '../games/games.module';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge]), GameModule],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengeGateway],
})
export class ChallengesModule {}
