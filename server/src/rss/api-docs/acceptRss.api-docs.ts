import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiAcceptRss() {
  return applyDecorators(
    ApiOperation({
      summary: 'RSS 승인 API',
    }),
    ApiParam({
      name: 'id',
      type: Number,
      description: '승인할 RSS의 ID',
      example: 1,
    }),
    ApiCreatedResponse({
      description: '승인 성공 시',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '승인이 완료되었습니다.',
      },
    }),
    ApiUnauthorizedResponse({
      description: '유효한 사용자 세션이 존재하지 않는 경우',
      example: {
        message: '인증되지 않은 요청입니다.',
      },
    }),
    ApiNotFoundResponse({
      description: '해당 ID의 RSS가 존재하지 않는 경우',
      example: {
        message: '존재하지 않는 rss 입니다.',
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
