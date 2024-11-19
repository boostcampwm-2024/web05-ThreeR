import { DataSource, LessThan, Repository } from 'typeorm';
import { Feed } from './feed.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedRepository extends Repository<Feed> {
  constructor(private dataSource: DataSource) {
    super(Feed, dataSource.createEntityManager());
  }

  async findFeed(queryFeedDto: QueryFeedDto) {
    const { lastId, limit } = queryFeedDto;

    const whereCondition: any = lastId ? { id: LessThan(lastId) } : {};
    return await this.find({
      where: whereCondition,
      order: { id: 'DESC' },
      take: limit + 1,
    });
  }
}

import { QueryFeedDto } from './dto/query-feed.dto';
