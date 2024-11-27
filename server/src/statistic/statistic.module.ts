import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { FeedRepository } from '../feed/feed.repository';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, FeedRepository],
})
export class StatisticModule {}
