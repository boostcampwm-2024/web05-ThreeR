import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function ApiReadAllRss() {
  return applyDecorators(
    ApiOperation({
      summary: 'RSS 전체 조회 API',
    }),
    ApiOkResponse({
      description: 'OK',
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
                name: { type: 'string' },
                userName: { type: 'string' },
                email: { type: 'string', format: 'email' },
                rssUrl: { type: 'string', format: 'url' },
              },
            },
          },
        },
      },
      example: {
        id: 1,
        name: '블로그 이름',
        userName: '신청자 명',
        email: 'test@test.com',
        rssURL: 'https://test.com/rss',
      },
    }),
  );
}
