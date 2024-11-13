import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiParam,
  ApiNotFoundResponse,
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
        example: {
          message: '승인이 완료되었습니다.',
        },
      },
    }),
    ApiNotFoundResponse({
      description: '해당 ID의 RSS가 존재하지 않는 경우',
      schema: {
        example: {
          statusCode: 404,
          message: '존재하지 않는 rss 입니다.',
          error: 'Not Found',
        },
      },
    }),
  );
}

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
    ApiCreatedResponse({
      description: '승인 거절 시',
      schema: {
        example: {
          message: '거절이 완료되었습니다.',
        },
      },
    }),
    ApiNotFoundResponse({
      description: '해당 ID의 RSS가 존재하지 않는 경우',
      schema: {
        example: {
          statusCode: 404,
          message: '존재하지 않는 rss 입니다.',
          error: 'Not Found',
        },
      },
    }),
  );
}
