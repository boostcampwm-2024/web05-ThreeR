import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import type { QueryFeedDto } from './dto/query-feed.dto';
import { Feed } from './feed.entity';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}
  async getFeedList(queryFeedDto: QueryFeedDto) {
    const result = await this.feedRepository.findFeed(queryFeedDto);
    return result;
  }

  existNextFeed(feedList: Feed[], limit: number) {
    return feedList.length > limit;
  }

  getLastIdFromFeedList(feedList: Feed[]) {
    if (feedList.length === 0) return 0;
    const lastFeed = feedList[feedList.length - 1];
    return lastFeed.id;
  }
}
