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

  getLastIdFromFeedList(feedList: Feed[]) {
    const lastFeed = feedList.pop();
    feedList.push(lastFeed);
    return lastFeed['feed_id'];
  }
}
