import { Module } from '@nestjs/common';
import { OngoingService } from './ongoing.service';
import { OngoingController } from './ongoing.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Ongoing } from './entities/ongoing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ongoing])],
  controllers: [OngoingController],
  providers: [OngoingService],

  exports: [OngoingService],
})
export class OngoingModule {}
