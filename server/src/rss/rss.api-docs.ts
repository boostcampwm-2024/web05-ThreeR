import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

export function ApiPostRegisterRss() {
  return applyDecorators(
    ApiOperation({
      summary: 'RSS 등록 API',
    }),
    ApiCreatedResponse({
      description: 'Created',
      schema: {
        example: {
          message: '신청이 완료되었습니다.',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          message: '값 검증 오류 메세지',
        },
      },
    }),
    ApiConflictResponse({
      description: 'Conflict',
      schema: {
        example: {
          message: '이미 등록된 RSS URL입니다.',
        },
      },
    }),
  );
}

export function ApiGetRss() {
  return applyDecorators(
    ApiOperation({
      summary: 'RSS 전체 조회 API',
    }),
    ApiCreatedResponse({
      description: 'OK',
      schema: {
        example: {
          id: 1,
          name: '안성윤',
          userName: '성윤',
          email: 'a@a.com',
          rssURL: 'url',
        },
      },
    }),
  );
}
