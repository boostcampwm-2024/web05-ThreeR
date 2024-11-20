import { Feed } from '../feed.entity';

export class FeedResponseDto {
  id: number;

  author: string;

  title: string;

  path: string;

  createAt: Date;

  thumbnail: string;

  viewCount: number;

  private constructor(
    id: number,
    author: string,
    title: string,
    path: string,
    ceratedAt: Date,
    thumbnail: string,
    viewCount: number,
  ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.path = path;
    this.createAt = ceratedAt;
    this.thumbnail = thumbnail;
    this.viewCount = viewCount;
  }

  private static mapFeedToFeedResponseDto(feed: Feed) {
    return new FeedResponseDto(
      feed.id,
      feed.blog.userName,
      feed.title,
      feed.path,
      feed.createdAt,
      feed.thumbnail,
      feed.viewCount,
    );
  }

  public static mapFeedsToFeedResponseDtoArray(FeedList: Feed[]) {
    return FeedList.map(this.mapFeedToFeedResponseDto);
  }
}
