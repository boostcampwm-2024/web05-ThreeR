import { ApiProperty } from '@nestjs/swagger';
import { Feed } from '../feed.entity';

export class FeedResponseDto {
  @ApiProperty({
    example: 1,
    description: '피드 ID',
  })
  id: number;

  @ApiProperty({
    example: '박무성',
    description: '작성자 이름',
  })
  author: string;

  @ApiProperty({
    example: 'ECS vs EKS 비교 분석',
    description: '게시물 제목',
  })
  title: string;

  @ApiProperty({
    example: 'https://dev-park.dev/ecs-eks',
    description: '피드 URL',
  })
  path: string;

  @ApiProperty({
    example: '2024-03-19T12:00:00Z',
    description: '작성일',
  })
  createAt: Date;

  @ApiProperty({
    example: 'https://dev-park.dev/thumbnails/containers.jpg',
    description: '썸네일 이미지 URL',
    required: false,
  })
  thumbnail: string;

  @ApiProperty({
    example: 100,
    description: '조회수',
  })
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
