import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
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
                id: 24,
                author: 'seok3765.log',
                title: 'ECS vs EKS 비교 분석',
                path: 'https://dev-park.dev/ecs-eks',
                createAt: '2024-03-11T06:30:00.000Z',
                thumbnail: 'https://dev-park.dev/thumbnails/containers.jpg',
                viewCount: 320,
              },
              {
                id: 23,
                author: 'seok3765.log',
                title: 'S3 비용 최적화 가이드',
                path: 'https://dev-park.dev/s3-cost',
                createAt: '2024-03-12T02:40:00.000Z',
                thumbnail: 'https://dev-park.dev/thumbnails/s3.jpg',
                viewCount: 190,
              },
              {
                id: 22,
                author: 'seok3765.log',
                title: 'DynamoDB 데이터 모델링',
                path: 'https://dev-park.dev/dynamodb-modeling',
                createAt: '2024-03-13T07:20:00.000Z',
                thumbnail: 'https://dev-park.dev/thumbnails/dynamodb.jpg',
                viewCount: 230,
              },
            ],
            lastId: 22,
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
                userName: '기억보다 기록을',
                title: '암묵지에서 형식지로',
                path: 'https://jojoldu.tistory.com/809',
                createdAt: '2024-10-27T02:08:55.000Z',
              },
              {
                id: 3,
                userName: '기억보다 기록을',
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

export function ApiGetTrendSse() {
  return applyDecorators(
    ApiOperation({
      summary: '트랜드 게시글 조회 SSE',
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
                title: '게시글 제목',
                path: 'https://test1.com/1',
                createdAt: '2024-11-24T01:00:00.000Z',
                thumbnail: 'https://test1.com/test.png',
                viewCount: 0,
              },
              {
                id: 2,
                author: '블로그 이름',
                title: '게시글 제목',
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
                title: '게시글 제목',
                path: 'https://test3.com/1',
                createdAt: '2024-11-24T03:00:00.000Z',
                thumbnail: 'https://test3.com/test.png',
                viewCount: 0,
              },
              {
                id: 4,
                author: '블로그 이름',
                title: '게시글 제목',
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
      summary: `게시글 조회수 업데이트 API`,
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
        example: {
          message: '요청이 성공적으로 처리되었습니다.',
        },
      },
    }),
  );
}
