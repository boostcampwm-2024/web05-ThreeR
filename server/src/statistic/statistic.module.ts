import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { FeedRepository } from '../feed/feed.repository';
import { RssAcceptRepository } from '../rss/rss.repository';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, FeedRepository, RssAcceptRepository],
})
export class StatisticModule {}
