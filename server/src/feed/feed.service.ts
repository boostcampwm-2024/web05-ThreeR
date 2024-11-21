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
import { redisKeys } from '../common/redis/redis.constant';

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
      redisKeys.FEED_TREND_KEY,
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
    await this.redisService.redisClient.del(redisKeys.FEED_TREND_KEY);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async analyzeTrend() {
    const [originTrend, nowTrend] = await Promise.all([
      this.redisService.redisClient.lrange(
        redisKeys.FEED_ORIGIN_TREND_KEY,
        0,
        3,
      ),
      this.redisService.redisClient.zrevrange(redisKeys.FEED_TREND_KEY, 0, 3),
    ]);
    if (!_.isEqual(originTrend, nowTrend)) {
      const redisPipeline = this.redisService.redisClient.pipeline();
      redisPipeline.del(redisKeys.FEED_ORIGIN_TREND_KEY);
      redisPipeline.rpush(redisKeys.FEED_ORIGIN_TREND_KEY, ...nowTrend);
      await redisPipeline.exec();
      const trendFeeds = await this.getTrendList();
      this.eventService.emit('ranking-update', trendFeeds);
    }
  }

  async search(searchFeedReq: SearchFeedReq) {
    const { find, page, limit, type } = searchFeedReq;
    const offset = (page - 1) * limit;

    const qb = this.feedRepository
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.blog', 'blog')
      .addSelect(this.getMatchAgainstExpression(type, 'find'), 'relevance')
      .where(this.getWhereCondition(type))
      .setParameters({ find })
      .orderBy('relevance', 'DESC')
      .addOrderBy('feed.createdAt', 'DESC')
      .skip(offset)
      .take(limit);

    const [result, totalCount] = await qb.getManyAndCount();
    const results = SearchFeedResult.feedsToResults(result);
    const totalPages = Math.ceil(totalCount / limit);

    return new SearchFeedRes(totalCount, results, totalPages, limit);
  }

  private getMatchAgainstExpression(type: string, parameter: string): string {
    switch (type) {
      case 'title':
        return `MATCH(feed.title) AGAINST (:${parameter} IN NATURAL LANGUAGE MODE)`;
      case 'blogName':
        return `MATCH(blog.name) AGAINST (:${parameter} IN NATURAL LANGUAGE MODE)`;
      case 'all':
        return `(MATCH(feed.title) AGAINST (:${parameter} IN NATURAL LANGUAGE MODE) + MATCH(blog.name) AGAINST (:${parameter} IN NATURAL LANGUAGE MODE))`;
      default:
        throw new BadRequestException('검색 타입이 잘못되었습니다.');
    }
  }

  private getWhereCondition(type: string): string {
    switch (type) {
      case 'title':
        return 'MATCH(feed.title) AGAINST (:find IN NATURAL LANGUAGE MODE)';
      case 'blogName':
        return 'MATCH(blog.name) AGAINST (:find IN NATURAL LANGUAGE MODE)';
      case 'all':
        return '(MATCH(feed.title) AGAINST (:find IN NATURAL LANGUAGE MODE) OR MATCH(blog.name) AGAINST (:find IN NATURAL LANGUAGE MODE))';
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

    await Promise.all([
      redis.sadd(`feed:${feedId}:ip`, ip),
      this.feedRepository.update(feedId, {
        viewCount: feed.viewCount + 1,
      }),
      redis.zincrby(redisKeys.FEED_TREND_KEY, 1, feedId.toString()),
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetIpTable() {
    const redis = this.redisService.redisClient;
    const keys = await redis.keys(redisKeys.FEED_ALL_IP_KEY);

    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}
