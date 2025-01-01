import { FeedView } from '../feed.entity';

export class FeedResponseDto {
  private constructor(
    private id: number,
    private author: string,
    private blogPlatform: string,
    private title: string,
    private path: string,
    private createdAt: Date,
    private thumbnail: string,
    private viewCount: number,
    private isNew: boolean,
  ) {}

  private static mapFeedToFeedResponseDto(feed: FeedResponse) {
    return new FeedResponseDto(
      feed.feedId,
      feed.blogName,
      feed.blogPlatform,
      feed.title,
      feed.path,
      feed.createdAt,
      feed.thumbnail,
      feed.viewCount,
      feed.isNew,
    );
  }

  public static mapFeedsToFeedResponseDtoArray(FeedList: FeedResponse[]) {
    return FeedList.map(this.mapFeedToFeedResponseDto);
  }
}

export type FeedResponse = FeedView & { isNew: boolean };
