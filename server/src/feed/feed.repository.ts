import { DataSource, Repository } from 'typeorm';
import { Feed } from './feed.entity';
import { Injectable } from '@nestjs/common';
import type { QueryFeedDto } from './dto/query-feed.dto';

@Injectable()
export class FeedRepository extends Repository<Feed> {
  constructor(private dataSource: DataSource) {
    super(Feed, dataSource.createEntityManager());
  }
  async findFeed(queryFeedDto: QueryFeedDto) {
    const { lastId, limit } = queryFeedDto;

    return await this.createQueryBuilder('feed')
      .where(lastId ? `feed.id < ${lastId}` : ``)
      .limit(limit + 1)
      .addOrderBy('feed.id', 'DESC')
      .getMany();
  }
}
