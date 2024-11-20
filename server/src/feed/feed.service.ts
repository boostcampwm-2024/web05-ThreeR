import { BadRequestException, Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { QueryFeedDto } from './dto/query-feed.dto';
import { Feed } from './feed.entity';
import {
  SearchFeedReq,
  SearchFeedRes,
  SearchFeedResult,
} from './dto/search-feed.dto';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  async getFeedData(queryFeedDto: QueryFeedDto) {
    const result = await this.feedRepository.findFeed(queryFeedDto);
    const hasMore = this.existNextFeed(result, queryFeedDto.limit);
    if (hasMore) result.pop();
    const lastId = this.getLastIdFromFeedList(result);
    return { result, lastId, hasMore };
  }

  private existNextFeed(feedList: Feed[], limit: number) {
    return feedList.length > limit;
  }

  private getLastIdFromFeedList(feedList: Feed[]) {
    if (feedList.length === 0) return 0;
    const lastFeed = feedList[feedList.length - 1];
    return lastFeed.id;
  }

  async search(searchFeedReq: SearchFeedReq) {
    console.log(typeof searchFeedReq.page);

    const { find, page, limit, type } = searchFeedReq;
    const offset = (page - 1) * limit;

    const qb = this.feedRepository
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.blog', 'blog')
      .orderBy('feed.createdAt', 'DESC')
      .skip(offset)
      .take(limit);
    this.applySearchConditions(qb, type, find);

    const [result, totalCount] = await qb.getManyAndCount();
    const results = SearchFeedResult.feedsToResults(result);
    const totalPages = Math.ceil(totalCount / limit);

    return new SearchFeedRes(totalCount, results, totalPages, limit);
  }

  private applySearchConditions(
    qb: SelectQueryBuilder<Feed>,
    type: string,
    find: string,
  ) {
    switch (type) {
      case 'title':
        qb.where('MATCH (feed.title) AGAINST (:find)', { find });
        break;
      case 'userName':
        qb.where('MATCH (blog.userName) AGAINST (:find)', { find });
        break;
      case 'all':
        qb.where('MATCH (feed.title) AGAINST (:find)', { find }).orWhere(
          'MATCH (blog.userName) AGAINST (:find)',
          { find },
        );
        break;
      default:
        throw new BadRequestException('검색 타입이 잘못되었습니다.');
    }
  }
}
