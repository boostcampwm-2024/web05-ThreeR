import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import {
  RssRejectRepository,
  RssRepository,
  RssAcceptRepository,
} from './rss.repository';
import { FeedCrawlerService } from './feed-crawler.service';
import { FeedRepository } from '../feed/feed.repository';
import { RssParserService } from './rss-parser.service';
import { EmailModule } from '../common/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [RssController],
  providers: [
    RssService,
    FeedCrawlerService,
    RssParserService,
    RssRepository,
    RssAcceptRepository,
    RssRejectRepository,
    FeedRepository,
  ],
})
export class RssModule {}
