import { DataSource, LessThan, Repository } from 'typeorm';
import { Feed } from './feed.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryFeedDto } from './dto/query-feed.dto';
import { SearchType } from './dto/search-feed.dto';

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

  async searchFeedList(
    find: string,
    limit: number,
    type: SearchType,
    offset: number,
  ) {
    const queryBuilder = this.createQueryBuilder('feed')
      .leftJoinAndSelect('feed.blog', 'rss_accept')
      .addSelect(this.getMatchAgainstExpression(type, 'find'), 'relevance')
      .where(this.getWhereCondition(type))
      .setParameters({ find })
      .orderBy('relevance', 'DESC')
      .addOrderBy('feed.createdAt', 'DESC')
      .skip(offset)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }

  private getMatchAgainstExpression(type: string, parameter: string): string {
    switch (type) {
      case 'title':
        return `MATCH(feed.title) AGAINST (:${parameter} IN NATURAL LANGUAGE MODE)`;
      case 'blogName':
        return `MATCH(rss_accept.name) AGAINST (:${parameter} IN NATURAL LANGUAGE MODE)`;
      case 'all':
        return `(MATCH(feed.title) AGAINST (:${parameter} IN NATURAL LANGUAGE MODE) + MATCH(rss_accept.name) AGAINST (:${parameter} IN NATURAL LANGUAGE MODE))`;
      default:
        throw new BadRequestException('검색 타입이 잘못되었습니다.');
    }
  }

  private getWhereCondition(type: string): string {
    switch (type) {
      case 'title':
        return 'MATCH(feed.title) AGAINST (:find IN NATURAL LANGUAGE MODE)';
      case 'blogName':
        return 'MATCH(rss_accept.name) AGAINST (:find IN NATURAL LANGUAGE MODE)';
      case 'all':
        return '(MATCH(feed.title) AGAINST (:find IN NATURAL LANGUAGE MODE) OR MATCH(rss_accept.name) AGAINST (:find IN NATURAL LANGUAGE MODE))';
      default:
        throw new BadRequestException('검색 타입이 잘못되었습니다.');
    }
  }

  async findFeedById(feedId: number) {
    return this.findOne({ where: { id: feedId } });
  }

  async updateFeedViewCount(feedId: number) {
    await this.update(feedId, {
      viewCount: () => 'view_count + 1',
    });
  }
}
