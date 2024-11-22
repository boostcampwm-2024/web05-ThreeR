import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { RssInformation } from './rss.entity';
import { RssRejectRepository, RssRepository } from './rss.repository';
import { BlogRepository } from '../blog/blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RssInformation])],
  controllers: [RssController],
  providers: [RssService, RssRepository, BlogRepository, RssRejectRepository],
})
export class RssModule {}
