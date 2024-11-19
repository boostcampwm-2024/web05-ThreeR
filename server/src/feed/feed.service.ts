import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { QueryFeedDto } from './dto/query-feed.dto';
import { Feed } from './feed.entity';

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
}
