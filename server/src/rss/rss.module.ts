import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { Rss, RssAccept, RssInformation, RssReject } from './rss.entity';
import {
  RssRejectRepository,
  RssRepository,
  RssAcceptRepository,
} from './rss.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Rss, RssAccept, RssReject])],
  controllers: [RssController],
  providers: [
    RssService,
    RssRepository,
    RssAcceptRepository,
    RssRejectRepository,
  ],
})
export class RssModule {}
