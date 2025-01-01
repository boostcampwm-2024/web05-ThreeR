import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FeedRepository, FeedViewRepository } from './feed.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [ScheduleModule.forRoot(), EventEmitterModule.forRoot()],
  controllers: [FeedController],
  providers: [FeedService, FeedRepository, FeedViewRepository],
})
export class FeedModule {}
