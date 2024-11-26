import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiTodayStatistic() {
  return applyDecorators(
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: '가지고 올 게시글 수',
      example: 10,
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
                id: {
                  type: 'number',
                },
                title: {
                  type: 'string',
                },
                viewCount: {
                  type: 'number',
                },
              },
            },
          },
        },
      },
      example: {
        message: '금일 조회수 통계 조회 완료',
        data: [
          {
            id: 1,
            title: 'testTitle',
            viewCount: 0,
          },
        ],
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '오류 메세지',
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '인증되지 않은 요청입니다.',
      },
    }),
  );
}
