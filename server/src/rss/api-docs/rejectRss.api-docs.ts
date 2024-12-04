import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiRejectRss() {
  return applyDecorators(
    ApiOperation({
      summary: 'RSS 거부 API',
    }),
    ApiParam({
      name: 'id',
      type: Number,
      description: '거절할 RSS의 ID',
      example: 1,
    }),
    ApiOkResponse({
      description: '승인 거절 시',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '거절이 완료되었습니다.',
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
