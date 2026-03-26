import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';

// For database
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';

import { OngoingModule } from '../ongoing/ongoing.module';

@Module({
  imports: [OngoingModule, TypeOrmModule.forFeature([Challenge])],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
