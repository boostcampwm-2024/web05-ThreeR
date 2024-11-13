import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { Rss } from './rss.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Rss])],
    controllers: [RssController],
    providers: [RssService],
})
export class RssModule {}
