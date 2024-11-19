import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

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
              author: '안성윤',
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
              author: '조민석',
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
              author: '박무성',
              title: '제목',
              path: 'https://asn6878.tistory.com/9',
              createdAt: '2022-09-05 09:00:00',
              thumbnail:
                'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2wH52%2FbtsJIskiFgS%2FQlF4XqMVZsM8y51w67dxj1%2Fimg.png',
              viewCount: 0,
            },
            {
              id: 4,
              author: '박무성',
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
