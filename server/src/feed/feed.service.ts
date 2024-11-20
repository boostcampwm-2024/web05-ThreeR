import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { QueryFeedDto } from './dto/query-feed.dto';
import { Feed } from './feed.entity';
import { FeedResponseDto } from './dto/feed-response.dto';
import { RedisService } from '../common/redis/redis.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as _ from 'lodash';

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
    const trendFeedIdList = await this.redisService.zrevrange(
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
    await this.redisService.del('feed:trend');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async analyzeTrend() {
    const [originTrend, nowTrend] = await Promise.all([
      this.redisService.lrange('feed:origin_trend', 0, 3),
      this.redisService.zrevrange('feed:trend', 0, 3),
    ]);
    if (!_.isEqual(originTrend, nowTrend)) {
      const redisPipeline = this.redisService.pipeline();
      redisPipeline.del('feed:origin_trend');
      redisPipeline.rpush('feed:origin_trend', ...nowTrend);
      await redisPipeline.exec();
      const trendFeeds = await this.getTrendList();
      this.eventService.emit('ranking-update', trendFeeds);
    }
  }
}
