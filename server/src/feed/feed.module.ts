import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { winstonModule } from '../common/logger/logger.module';
import { Feed } from './feed.entity';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FeedRepository } from './feed.repository';

@Module({
  imports: [winstonModule, TypeOrmModule.forFeature([Feed])],
  controllers: [FeedController],
  providers: [FeedService, FeedRepository],
})
export class FeedModule {}
