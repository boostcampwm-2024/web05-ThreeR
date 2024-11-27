import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import {
  RssRejectRepository,
  RssRepository,
  RssAcceptRepository,
} from './rss.repository';

@Module({
  imports: [],
  controllers: [RssController],
  providers: [
    RssService,
    RssRepository,
    RssAcceptRepository,
    RssRejectRepository,
  ],
})
export class RssModule {}
