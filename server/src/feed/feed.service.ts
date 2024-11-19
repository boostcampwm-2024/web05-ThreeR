import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { QueryFeedDto } from './dto/query-feed.dto';
import { Feed } from './feed.entity';
import Fuse from 'fuse.js';
import { Blog } from '../blog/blog.entity';
import { SearchFeedDto } from './dto/search-feed.dto';

@Injectable()
export class FeedService {
  private fuse: Fuse<Feed & { blog: Blog }>;

  constructor(private readonly feedRepository: FeedRepository) {
    this.initializeFuse();
  }

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

  async initializeFuse() {
    const feeds = await this.feedRepository.find({ relations: ['blog'] });

    const options = {
      keys: ['title', 'blog.name'],
      includeScore: true,
      threshold: 0.3,
    };
    this.fuse = new Fuse(feeds, options);
  }

  async search(searchFeedDto: SearchFeedDto) {
    if (!this.fuse) {
      await this.initializeFuse();
    }
    const results = this.fuse.search(searchFeedDto.find);
    return results.map((result) => result.item);
  }
}
