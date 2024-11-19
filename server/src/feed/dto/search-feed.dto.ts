// const searchType = {
//   1: ['title'],
//   2: ['blog.name'],
//   3: ['title', 'blog.name'],
// }

export class SearchFeedDto {
  find: string;
  type: string;
  page: number;
  limit: number;
  lastId: number;
}
