import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FeedRepository, FeedViewRepository } from './feed.repository';
import { QueryFeedDto } from './dto/query-feed.dto';
import { FeedView } from './feed.entity';
import {
  FeedPaginationResult,
  FeedPaginationResponseDto,
  FeedTrendResponseDto,
} from './dto/feed-response.dto';
import { RedisService } from '../common/redis/redis.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as _ from 'lodash';
import {
  SearchFeedReq,
  SearchFeedRes,
  SearchFeedResult,
} from './dto/search-feed.dto';
import { Response, Request } from 'express';
import { cookieConfig } from '../common/cookie/cookie.config';
import { redisKeys } from '../common/redis/redis.constant';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly feedViewRepository: FeedViewRepository,
    private readonly redisService: RedisService,
    private readonly eventService: EventEmitter2,
  ) {}

  async readFeedPagination(queryFeedDto: QueryFeedDto) {
    const feedList =
      await this.feedViewRepository.findFeedPagination(queryFeedDto);
    const hasMore = this.existNextFeed(feedList, queryFeedDto.limit);
    if (hasMore) feedList.pop();
    const lastId = this.getLastIdFromFeedList(feedList);
    const newCheckFeedList = await this.checkNewFeeds(feedList);
    const result =
      FeedPaginationResponseDto.mapToPaginationResponseDtoArray(
        newCheckFeedList,
      );
    return { result, lastId, hasMore };
  }

  private existNextFeed(feedList: FeedView[], limit: number) {
    return feedList.length > limit;
  }

  private getLastIdFromFeedList(feedList: FeedView[]) {
    return feedList.length ? feedList[feedList.length - 1].feedId : 0;
  }

  private async checkNewFeeds(feedList: FeedView[]) {
    const newFeedIds = (
      await this.redisService.redisClient.keys(redisKeys.FEED_RECENT_ALL_KEY)
    ).map((key) => {
      const id = key.match(/feed:recent:(\d+)/);
      return parseInt(id[1]);
    });

    return feedList.map((feed): FeedPaginationResult => {
      return {
        ...feed,
        isNew: newFeedIds.includes(feed.feedId),
      };
    });
  }

  async readTrendFeedList() {
    const trendFeedIdList = await this.redisService.redisClient.lrange(
      redisKeys.FEED_ORIGIN_TREND_KEY,
      0,
      -1,
    );
    const trendFeeds = await Promise.all(
      trendFeedIdList.map(async (feedId) =>
        this.feedViewRepository.findFeedById(parseInt(feedId)),
      ),
    );
    return FeedTrendResponseDto.toFeedTrendResponseDtoArray(
      trendFeeds.filter((feed) => feed !== null),
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetTrendTable() {
    await this.redisService.redisClient.del(redisKeys.FEED_TREND_KEY);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
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
      const trendFeeds = await this.readTrendFeedList();
      this.eventService.emit('ranking-update', trendFeeds);
    }
  }

  async searchFeedList(searchFeedReq: SearchFeedReq) {
    const { find, page, limit, type } = searchFeedReq;
    const offset = (page - 1) * limit;
    if (this.validateSearchType(type)) {
      const [result, totalCount] = await this.feedRepository.searchFeedList(
        find,
        limit,
        type,
        offset,
      );

      const results = SearchFeedResult.feedsToResults(result);
      const totalPages = Math.ceil(totalCount / limit);

      return new SearchFeedRes(totalCount, results, totalPages, limit);
    }
    throw new BadRequestException('검색 타입이 잘못되었습니다.');
  }

  private validateSearchType(type: string) {
    const searchType = {
      title: 'title',
      blogName: 'blogName',
      all: 'all',
    };

    return searchType.hasOwnProperty(type);
  }

  async updateFeedViewCount(
    feedId: number,
    request: Request,
    response: Response,
  ) {
    const cookie = request.headers.cookie;
    const ip = this.getIp(request);
    if (ip && this.isString(ip)) {
      const redis = this.redisService.redisClient;
      const [feed, hasCookie, hasIpFlag] = await Promise.all([
        this.feedRepository.findOne({ where: { id: feedId } }),
        Boolean(cookie?.includes(`View_count_${feedId}=${feedId}`)),
        redis.sismember(`feed:${feedId}:ip`, ip),
      ]);

      if (!feed) {
        throw new NotFoundException(`${feedId}번 피드를 찾을 수 없습니다.`);
      }

      if (!hasCookie) {
        this.createCookie(response, feedId);
      }

      if (hasCookie || hasIpFlag) {
        return null;
      }

      await Promise.all([
        redis.sadd(`feed:${feedId}:ip`, ip),
        this.feedRepository.update(feedId, {
          viewCount: () => 'view_count + 1',
        }),
        redis.zincrby(redisKeys.FEED_TREND_KEY, 1, feedId.toString()),
      ]);
    }
  }

  private isString(ip: string | string[]): ip is string {
    return !Array.isArray(ip);
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

  async readRecentFeedList() {
    const redis = this.redisService.redisClient;
    const recentKeys = await redis.keys(redisKeys.FEED_RECENT_ALL_KEY);
    const recentFeedList: FeedPaginationResult[] = [];

    if (!recentKeys.length) {
      return recentFeedList;
    }

    const pipeLine = redis.pipeline();
    for (const key of recentKeys) {
      pipeLine.hgetall(key);
    }
    const result = await pipeLine.exec();
    recentFeedList.push(
      ...result.map(([, feed]: [any, FeedPaginationResult]) => {
        feed.isNew = true;
        return feed;
      }),
    );

    return recentFeedList.sort((currentFeed, nextFeed) => {
      const dateCurrent = new Date(currentFeed.createdAt);
      const dateNext = new Date(nextFeed.createdAt);
      return dateNext.getTime() - dateCurrent.getTime();
    });
  }

  private getIp(request: Request) {
    const forwardedFor = request.headers['x-forwarded-for'];

    if (typeof forwardedFor === 'string') {
      const forwardedIps = forwardedFor.split(',');
      return forwardedIps[0].trim();
    }

    return request.socket.remoteAddress;
  }
}
