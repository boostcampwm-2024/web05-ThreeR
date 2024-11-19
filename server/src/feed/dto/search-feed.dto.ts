// const searchType = {
//   1: ['title'],
//   2: ['blog.name'],
//   3: ['title', 'blog.name'],
// }

import { Feed } from '../feed.entity';

export class SearchFeedReq {
  find: string;
  type: string;
  page: number;
  limit: number;
  lastId: number; // TODO : FE 담당자와 협의 필요.
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
