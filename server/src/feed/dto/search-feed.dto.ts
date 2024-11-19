import { Feed } from '../feed.entity';
import { IsDefined, IsEnum, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum SearchType {
  TITLE = 'title',
  USERNAME = 'userName',
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
    message: '검색 타입은 title, userName, all 중 하나여야 합니다.',
  })
  type: SearchType;
  @IsInt({
    message: '페이지 번호는 정수입니다.',
  })
  @Type(() => Number)
  page?: number = 1;
  @IsInt({
    message: '한 페이지에 보여줄 개수는 정수입니다.',
  })
  @Type(() => Number)
  limit?: number = 4;
  lastId?: number; // TODO : FE 담당자와 협의 필요.
}

export class SearchFeedResult {
  id: number;
  userName: string;
  title: string;
  path: string;
  createdAt: Date;

  constructor(
    id: number,
    userName: string,
    title: string,
    path: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.userName = userName;
    this.title = title;
    this.path = path;
    this.createdAt = createdAt;
  }

  static feedsToResults(feeds: Feed[]): SearchFeedResult[] {
    return feeds.map((item) => {
      return new SearchFeedResult(
        item.id,
        item.blog.userName,
        item.title,
        item.path,
        item.createdAt,
      );
    });
  }
}

export class SearchFeedRes {
  totalCount: number;
  result: SearchFeedResult[];
  totalPages: number;
  limit: number;

  constructor(
    totalCount: number,
    result: SearchFeedResult[],
    totalPages: number,
    limit: number,
  ) {
    this.totalCount = totalCount;
    this.result = result;
    this.totalPages = totalPages;
    this.limit = limit;
  }
}
