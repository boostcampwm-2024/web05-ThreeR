import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { applyDecorators, Search } from '@nestjs/common';
import { SearchType } from './dto/search-feed.dto';

export function ApiGetFeedList() {
  return applyDecorators(
    ApiOperation({
      summary: `메인 화면 게시글 조회 API`,
    }),
    ApiQuery({
      name: 'lastId',
      required: false,
      type: Number,
      description: '마지막으로 받은 피드의 ID',
      example: 10,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: '한 번에 가져올 피드 수',
      example: 5,
      default: 12,
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        example: {
          message: '피드 조회 완료',
          data: {
            result: [
              {
                id: 42,
                createdAt: '2024-11-16T06:33:17.000Z',
                title: 'Dummy Title 20',
                viewCount: 200,
                path: '/path/to/feed20',
                thumbnail: '/path/to/thumbnail20',
              },
              {
                id: 41,
                createdAt: '2024-11-16T06:33:17.000Z',
                title: 'Dummy Title 19',
                viewCount: 190,
                path: '/path/to/feed19',
                thumbnail: '/path/to/thumbnail19',
              },
              {
                id: 40,
                createdAt: '2024-11-16T06:33:17.000Z',
                title: 'Dummy Title 18',
                viewCount: 180,
                path: '/path/to/feed18',
                thumbnail: '/path/to/thumbnail18',
              },
              {
                id: 39,
                createdAt: '2024-11-16T06:33:17.000Z',
                title: 'Dummy Title 17',
                viewCount: 170,
                path: '/path/to/feed17',
                thumbnail: '/path/to/thumbnail17',
              },
              {
                id: 38,
                createdAt: '2024-11-16T06:33:17.000Z',
                title: 'Dummy Title 16',
                viewCount: 160,
                path: '/path/to/feed16',
                thumbnail: '/path/to/thumbnail16',
              },
            ],
            lastId: 38,
            hasMore: true,
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          message: '오류 메세지 출력',
        },
      },
    }),
  );
}

export function ApiSearchFeed() {
  return applyDecorators(
    ApiOperation({
      summary: `검색 API`,
    }),
    ApiQuery({
      name: 'find',
      required: true,
      type: String,
      description: '검색어',
      example: '데나무',
    }),
    ApiQuery({
      name: 'type',
      required: true,
      enum: SearchType,
      description: '검색 타입',
      example: SearchType.ALL,
    }),
    ApiQuery({
      name: 'page',
      required: true,
      type: Number,
      description: '페이지 번호',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: true,
      type: Number,
      description: '한 페이지에 보여줄 개수',
      example: 4,
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        example: {
          message: '검색 결과 조회 완료',
          data: {
            totalCount: 2,
            result: [
              {
                id: 2,
                userName: '향로',
                title: '암묵지에서 형식지로',
                path: 'https://jojoldu.tistory.com/809',
                createdAt: '2024-10-27T02:08:55.000Z',
              },
              {
                id: 3,
                userName: '향로',
                title: '주인이 아닌데 어떻게 주인의식을 가지죠',
                path: 'https://jojoldu.tistory.com/808',
                createdAt: '2024-10-12T18:15:06.000Z',
              },
            ],
            totalPages: 3,
            limit: 2,
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          message: '오류 메세지 출력',
        },
      },
    }),
  );
}
