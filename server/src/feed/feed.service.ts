import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.repository';
import { QueryFeedDto } from './dto/query-feed.dto';
import { Feed } from './feed.entity';

type Post = {
  id: number;
  author: string;
  title: string;
  path: string;
  createAt: Date;
  thumbnail: string;
  viewCount: number;
};

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  async getPostData(queryFeedDto: QueryFeedDto) {
    const feedList = await this.feedRepository.findFeed(queryFeedDto);
    const result = this.mapFeedsToPost(feedList);
    const hasMore = this.existNextFeed(result, queryFeedDto.limit);
    if (hasMore) result.pop();
    const lastId = this.getLastIdFromFeedList(result);
    return { result, lastId, hasMore };
  }

  private existNextFeed(postList: Post[], limit: number) {
    return postList.length > limit;
  }

  private getLastIdFromFeedList(postList: Post[]) {
    if (postList.length === 0) return 0;
    const lastFeed = postList[postList.length - 1];
    return lastFeed.id;
  }

  private mapFeedToPost(feed: Feed): Post {
    return {
      id: feed.id,
      author: feed.blog.userName,
      title: feed.title,
      path: feed.path,
      createAt: feed.createdAt,
      thumbnail: feed.thumbnail,
      viewCount: feed.viewCount,
    };
  }

  private mapFeedsToPost(FeedList: Feed[]) {
    return FeedList.map(this.mapFeedToPost);
  }
}
