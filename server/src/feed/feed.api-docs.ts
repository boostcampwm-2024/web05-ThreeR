import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { applyDecorators, NotFoundException } from '@nestjs/common';
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
        properties: {
          message: {
            type: 'string',
          },
          data: {
            type: 'object',
            properties: {
              result: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    author: { type: 'string' },
                    blogPlatform: { type: 'string' },
                    title: { type: 'string' },
                    path: { type: 'string', format: 'url' },
                    createAt: { type: 'string', format: 'date-time' },
                    thumbnail: { type: 'string', format: 'url' },
                    viewCount: { type: 'number' },
                  },
                },
              },
              lastId: { type: 'number' },
              hasMore: { type: 'boolean' },
            },
          },
        },
      },
      example: {
        message: '피드 조회 완료',
        data: {
          result: [
            {
              id: 3,
              author: '블로그 이름',
              blogPlatform: '블로그 서비스 플랫폼',
              title: '피드 제목',
              path: 'https://test.com',
              createAt: '2024-06-16T20:00:57.000Z',
              thumbnail: 'https://test.com/image.png',
              viewCount: 1,
            },
          ],
          lastId: 3,
          hasMore: true,
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      example: {
        message: '오류 메세지',
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
        properties: {
          message: {
            type: 'string',
          },
          data: {
            type: 'object',
            properties: {
              totalCount: {
                type: 'number',
              },
              result: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number',
                    },
                    blogName: {
                      type: 'string',
                    },
                    title: {
                      type: 'string',
                    },
                    path: {
                      type: 'string',
                      format: 'url',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                    },
                  },
                },
              },
              totalPages: {
                type: 'number',
              },
              limit: {
                type: 'number',
              },
            },
          },
        },
      },
      example: {
        message: '검색 결과 조회 완료',
        data: {
          totalCount: 1,
          result: [
            {
              id: 1,
              blogName: '블로그 이름',
              title: '데나무',
              path: 'https://test.com/1',
              createdAt: '2024-10-27T02:08:55.000Z',
            },
          ],
          totalPages: 3,
          limit: 1,
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      example: {
        message: '오류 메세지',
      },
    }),
  );
}

export function ApiGetTrendSse() {
  return applyDecorators(
    ApiOperation({
      summary: '트렌드 게시글 조회 SSE',
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                author: { type: 'string' },
                blogPlatform: { type: 'string' },
                title: { type: 'string' },
                path: { type: 'string' },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                },
                thumbnail: { type: 'string' },
                viewCount: { type: 'number' },
              },
            },
          },
        },
      },
      examples: {
        connect: {
          summary: '현재 트렌드 피드 수신 완료',
          value: {
            message: '현재 트렌드 피드 수신 완료',
            data: [
              {
                id: 1,
                author: '블로그 이름',
                blogPlatform: '블로그 서비스 플랫폼',
                title: '피드 제목',
                path: 'https://test1.com/1',
                createdAt: '2024-11-24T01:00:00.000Z',
                thumbnail: 'https://test1.com/test.png',
                viewCount: 0,
              },
              {
                id: 2,
                author: '블로그 이름',
                blogPlatform: '블로그 서비스 플랫폼',
                title: '피드 제목',
                path: 'https://test2.com/1',
                createdAt: '2024-11-24T02:00:00.000Z',
                thumbnail: 'https://test2.com/test.png',
                viewCount: 0,
              },
            ],
          },
        },
        continue: {
          summary: '새로운 트렌드 피드 수신 완료',
          value: {
            message: '새로운 트렌드 피드 수신 완료',
            data: [
              {
                id: 3,
                author: '블로그 이름',
                blogPlatform: '블로그 서비스 플랫폼',
                title: '피드 제목',
                path: 'https://test3.com/1',
                createdAt: '2024-11-24T03:00:00.000Z',
                thumbnail: 'https://test3.com/test.png',
                viewCount: 0,
              },
              {
                id: 4,
                author: '블로그 이름',
                blogPlatform: '블로그 서비스 플랫폼',
                title: '피드 제목',
                path: 'https://test4.com/1',
                createdAt: '2024-11-24T04:00:00.000Z',
                thumbnail: 'https://test4.com/test.png',
                viewCount: 0,
              },
            ],
          },
        },
      },
    }),
  );
}

export function ApiUpdateFeedViewCount() {
  return applyDecorators(
    ApiOperation({
      summary: `피드 조회수 업데이트 API`,
    }),
    ApiParam({
      name: 'feedId',
      required: true,
      type: Number,
      description: '클릭한 피드의 id',
      example: 1,
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '요청이 성공적으로 처리되었습니다.',
      },
    }),
    ApiNotFoundResponse({
      description: '해당 ID의 피드가 존재하지 않는 경우',
      example: {
        message: '{feedId}번 피드를 찾을 수 없습니다.',
      },
    }),
  );
}
