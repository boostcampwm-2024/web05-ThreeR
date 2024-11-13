import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { RssInformation } from './rss.entity';
import { RssRepository } from './rss.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RssInformation])],
  controllers: [RssController],
  providers: [RssService, RssRepository],
})
export class RssModule {}
