import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function ApiReadPlatformStatistic() {
  return applyDecorators(
    ApiOperation({
      summary: '블로그 플랫폼 통계 조회 API',
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
              properties: {
                platform: {
                  type: 'string',
                },
                count: {
                  type: 'number',
                },
              },
            },
          },
        },
      },
      example: {
        message: '블로그 플랫폼 통계 조회 완료',
        data: [
          {
            platform: 'test',
            count: 30,
          },
        ],
      },
    }),
  );
}
