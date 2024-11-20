import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { QueryFeedDto } from './dto/query-feed.dto';
import { Feed } from './feed.entity';
import { FeedResponseDto } from './dto/feed-response.dto';
import { RedisService } from '../common/redis/redis.service';

@Injectable()
export class FeedService {
  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly redisService: RedisService,
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
    const trendFeedIdList = await this.redisService.zrange('feed:trend', 0, 3);
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
}
