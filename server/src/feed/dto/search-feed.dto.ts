import { Feed } from '../feed.entity';
import { IsDefined, IsEnum, IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum SearchType {
  TITLE = 'title',
  BLOGNAME = 'blogName',
  ALL = 'all',
}

export class SearchFeedReq {
  @IsDefined({
    message: '검색어를 입력해주세요.',
  })
  @IsString()
  find: string;

  @IsDefined({
    message: '검색 타입을 입력해주세요.',
  })
  @IsEnum(SearchType, {
    message: '검색 타입은 title, blogName, all 중 하나여야 합니다.',
  })
  type: SearchType;

  @IsInt({
    message: '페이지 번호는 정수입니다.',
  })
  @Min(1, { message: '페이지 번호는 1보다 커야합니다.' })
  @Type(() => Number)
  page?: number = 1;

  @IsInt({
    message: '한 페이지에 보여줄 개수는 정수입니다.',
  })
  @Min(1, { message: '개수 제한은 1보다 커야합니다.' })
  @Type(() => Number)
  limit?: number = 4;

  constructor(partial: Partial<SearchFeedReq>) {
    Object.assign(this, partial);
  }
}

export class SearchFeedResult {
  constructor(
    private id: number,
    private blogName: string,
    private title: string,
    private path: string,
    private createdAt: Date,
  ) {}

  static feedsToResults(feeds: Feed[]): SearchFeedResult[] {
    return feeds.map((item) => {
      return new SearchFeedResult(
        item.id,
        item.blog.name,
        item.title,
        item.path,
        item.createdAt,
      );
    });
  }
}

export class SearchFeedRes {
  constructor(
    private totalCount: number,
    private result: SearchFeedResult[],
    private totalPages: number,
    private limit: number,
  ) {}
}
