import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { QueryFeedDto } from './dto/query-feed.dto';
import { Feed } from './feed.entity';
import { FeedResponseDto } from './dto/feed-response.dto';
import { RedisService } from '../common/redis/redis.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as _ from 'lodash';
import {
  SearchFeedReq,
  SearchFeedRes,
  SearchFeedResult,
} from './dto/search-feed.dto';
import { SelectQueryBuilder } from 'typeorm';
import { Response } from 'express';
import { cookieConfig } from '../common/cookie/cookie.config';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly redisService: RedisService,
    private readonly eventService: EventEmitter2,
  ) {}

  async getFeedData(queryFeedDto: QueryFeedDto) {
    const feedList = await this.feedRepository.findFeed(queryFeedDto);
    const hasMore = this.existNextFeed(feedList, queryFeedDto.limit);
    if (hasMore) feedList.pop();
    const lastId = this.getLastIdFromFeedList(feedList);
    const result = FeedResponseDto.mapFeedsToFeedResponseDtoArray(feedList);
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

  async getTrendList() {
    const trendFeedIdList = await this.redisService.redisClient.zrevrange(
      'feed:trend',
      0,
      3,
    );
    const trendFeeds = await Promise.all(
      trendFeedIdList.map(async (feedId) => {
        const feed = await this.feedRepository.findTrendFeed(parseInt(feedId));
        if (!feed) {
          return null;
        }
        feed['author'] = feed.blog['userName'];
        delete feed.blog;
        return feed;
      }),
    );
    return trendFeeds.filter((feed) => feed !== null);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetTrendTable() {
    await this.redisService.redisClient.del('feed:trend');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async analyzeTrend() {
    const [originTrend, nowTrend] = await Promise.all([
      this.redisService.redisClient.lrange('feed:origin_trend', 0, 3),
      this.redisService.redisClient.zrevrange('feed:trend', 0, 3),
    ]);
    if (!_.isEqual(originTrend, nowTrend)) {
      const redisPipeline = this.redisService.redisClient.pipeline();
      redisPipeline.del('feed:origin_trend');
      redisPipeline.rpush('feed:origin_trend', ...nowTrend);
      await redisPipeline.exec();
      const trendFeeds = await this.getTrendList();
      this.eventService.emit('ranking-update', trendFeeds);
    }
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

  async updateFeedViewCount(feedId: number, ip: string, cookie, response) {
    const redis = this.redisService.redisClient;
    const [feed, hasCookie, hasIpFlag] = await Promise.all([
      this.feedRepository.findOne({ where: { id: feedId } }),
      Boolean(cookie?.[`View_count_${feedId}`]),
      redis.sismember(`feed:${feedId}:ip`, ip),
    ]);

    if (!feed) {
      throw new NotFoundException(`${feedId}번 피드를 찾을 수 없습니다.`);
    }

    if (!hasCookie) {
      this.createCookie(response, feedId);
    }

    if (hasCookie || hasIpFlag === 1) {
      return null;
    }

    Promise.all([
      redis.sadd(`feed:${feedId}:ip`, ip),
      this.feedRepository.update(feedId, {
        viewCount: feed.viewCount + 1,
      }),
    ]);
  }

  private createCookie(response: Response, feedId: number) {
    const cookieConfigWithExpiration = {
      ...cookieConfig[process.env.NODE_ENV],
      expires: this.getExpirationTime(),
    };
    response.cookie(`View_count_${feedId}`, feedId, cookieConfigWithExpiration);
  }

  private getExpirationTime() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }
}
