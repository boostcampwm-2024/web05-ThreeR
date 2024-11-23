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

export function ApiGetTrendList() {
  return applyDecorators(
    ApiOperation({
      summary: '트랜드 게시글 조회 API',
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        example: {
          message: '트렌드 피드 조회 완료',
          data: [
            {
              id: 1,
              author: '해야지 뭐',
              title:
                '자바스크립트의 구조와 실행 방식 (Ignition, TurboFan, EventLoop)',
              path: 'https://asn6878.tistory.com/9',
              createdAt: '2022-09-05 09:00:00',
              thumbnail:
                'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
              viewCount: 0,
            },
            {
              id: 2,
              author: 'seok3765.log',
              title:
                '[네이버 커넥트재단 부스트캠프 웹・모바일 9기] 날 것 그대로 작성하는 챌린지 수료 후기 - Web',
              path: 'https://velog.io/@seok3765/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%BB%A4%EB%84%A5%ED%8A%B8%EC%9E%AC%EB%8B%A8-%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%9B%B9%E3%83%BB%EB%AA%A8%EB%B0%94%EC%9D%BC-9%EA%B8%B0-%EB%82%A0-%EA%B2%83-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%9E%91%EC%84%B1%ED%95%98%EB%8A%94-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EC%88%98%EB%A3%8C-%ED%9B%84%EA%B8%B0-Web',
              createdAt: '2024-08-14 14:07:49',
              thumbnail:
                'https://velog.velcdn.com/images/seok3765/post/2f863481-b594-46f8-9a28-7799afb58aa4/image.jpg',
              viewCount: 0,
            },
            {
              id: 3,
              author: '해야지 뭐',
              title: '제목',
              path: 'https://asn6878.tistory.com/9',
              createdAt: '2022-09-05 09:00:00',
              thumbnail:
                'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
              viewCount: 0,
            },
            {
              id: 4,
              author: '해야지 뭐',
              title: '제목',
              path: 'https://asn6878.tistory.com/9',
              createdAt: '2022-09-05 10:00:00',
              thumbnail:
                'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
              viewCount: 0,
            },
          ],
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
        example: {
          message: '트렌드 피드 수신 완료',
          data: [
            {
              id: 1,
              author: '해야지 뭐',
              title:
                '자바스크립트의 구조와 실행 방식1 (Ignition, TurboFan, EventLoop)',
              path: 'https://asn6878.tistory.com/9',
              createdAt: '2022-09-05 09:00:00',
              thumbnail:
                'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
              viewCount: 0,
            },
            {
              id: 2,
              author: 'seok3765.log',
              title:
                '[네이버 커넥트재단 부스트캠프 웹・모바일 9기] 날 것 그대로 작성하는 챌린지 수료 후기 - Web',
              path: 'https://velog.io/@seok3765/%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%BB%A4%EB%84%A5%ED%8A%B8%EC%9E%AC%EB%8B%A8-%EB%B6%80%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%94%84-%EC%9B%B9%E3%83%BB%EB%AA%A8%EB%B0%94%EC%9D%BC-9%EA%B8%B0-%EB%82%A0-%EA%B2%83-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EC%9E%91%EC%84%B1%ED%95%98%EB%8A%94-%EC%B1%8C%EB%A6%B0%EC%A7%80-%EC%88%98%EB%A3%8C-%ED%9B%84%EA%B8%B0-Web',
              createdAt: '2024-08-14 14:07:49',
              thumbnail:
                'https://velog.velcdn.com/images/seok3765/post/2f863481-b594-46f8-9a28-7799afb58aa4/image.jpg',
              viewCount: 0,
            },
            {
              id: 3,
              author: '해야지 뭐',
              title:
                '자바스크립트의 구조와 실행 방식2 (Ignition, TurboFan, EventLoop)',
              path: 'https://asn6878.tistory.com/10',
              createdAt: '2022-09-05 09:00:00',
              thumbnail:
                'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
              viewCount: 0,
            },
            {
              id: 4,
              author: '해야지 뭐',
              title:
                '자바스크립트의 구조와 실행 방식3 (Ignition, TurboFan, EventLoop)',
              path: 'https://asn6878.tistory.com/11',
              createdAt: '2022-09-05 10:00:00',
              thumbnail:
                'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
              viewCount: 0,
            },
          ],
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
