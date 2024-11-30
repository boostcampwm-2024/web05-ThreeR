import { DataSource, LessThan, Repository } from 'typeorm';
import { Feed } from './feed.entity';
import { Injectable } from '@nestjs/common';
import { QueryFeedDto } from './dto/query-feed.dto';

@Injectable()
export class FeedRepository extends Repository<Feed> {
  constructor(private dataSource: DataSource) {
    super(Feed, dataSource.createEntityManager());
  }

  async findFeed(queryFeedDto: QueryFeedDto) {
    const { lastId, limit } = queryFeedDto;

    return await this.find({
      where: lastId ? { id: LessThan(lastId) } : {},
      order: { id: 'DESC' },
      take: limit + 1,
      relations: ['blog'],
    });
  }

  async findTrendFeed(feedId: number) {
    return this.findOne({
      where: { id: feedId },
      relations: ['blog'],
    });
  }
}
