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
