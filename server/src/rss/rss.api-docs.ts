import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

export function ApiPostRegisterRss() {
  return applyDecorators(
    ApiOperation({
      summary: 'RSS 등록 API',
    }),
    ApiCreatedResponse({
      description: 'Created',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
        example: {
          message: '신청이 완료되었습니다.',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          message: '오류 메세지',
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
        example: {
          id: 1,
          name: '블로그 이름',
          userName: '신청자 명',
          email: 'test@test.com',
          rssURL: 'https://test.com/rss',
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
        properties: {
          message: {
            type: 'string',
          },
        },
        example: {
          message: '승인이 완료되었습니다.',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: '유효한 사용자 세션이 존재하지 않는 경우',
      schema: {
        example: {
          message: '인증되지 않은 요청입니다.',
        },
      },
    }),
    ApiNotFoundResponse({
      description: '해당 ID의 RSS가 존재하지 않는 경우',
      schema: {
        example: {
          message: '존재하지 않는 rss 입니다.',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          message: '오류 메세지',
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
    ApiOkResponse({
      description: '승인 거절 시',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
        example: {
          message: '거절이 완료되었습니다.',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: '유효한 사용자 세션이 존재하지 않는 경우',
      schema: {
        example: {
          message: '인증되지 않은 요청입니다.',
        },
      },
    }),
    ApiNotFoundResponse({
      description: '해당 ID의 RSS가 존재하지 않는 경우',
      schema: {
        example: {
          message: '존재하지 않는 rss 입니다.',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          message: '오류 메세지',
        },
      },
    }),
  );
}

export function ApiAcceptHistory() {
  return applyDecorators(
    ApiOperation({
      summary: 'RSS 승인 기록 API',
    }),
    ApiOkResponse({
      description: '기록 조회 성공시',
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
                name: {
                  type: 'string',
                },
                userName: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
                rssUrl: {
                  type: 'string',
                  format: 'url',
                },
              },
            },
          },
        },
        example: {
          message: '승인 기록 조회가 완료되었습니다.',
          data: [
            {
              id: 1,
              name: '블로그 이름',
              userName: '사용자 이름',
              email: 'test@test.com',
              rssUrl: 'https://test/rss',
            },
          ],
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: '유효한 사용자 세션이 존재하지 않는 경우',
      schema: {
        example: {
          message: '인증되지 않은 요청입니다.',
        },
      },
    }),
  );
}

export function ApiRejectHistory() {
  return applyDecorators(
    ApiOperation({
      summary: 'RSS 거절 기록 API',
    }),
    ApiOkResponse({
      description: '기록 조회 성공시',
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
                name: {
                  type: 'string',
                },
                userName: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
                rssUrl: {
                  type: 'string',
                  format: 'url',
                },
              },
            },
          },
        },
        example: {
          message: 'RSS 거절 기록을 조회하였습니다.',
          data: [
            {
              id: 1,
              name: '블로그 이름',
              userName: '사용자 이름',
              email: 'test@test.com',
              rssUrl: 'https://test/rss',
            },
          ],
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: '유효한 사용자 세션이 존재하지 않는 경우',
      schema: {
        example: {
          message: '인증되지 않은 요청입니다.',
        },
      },
    }),
  );
}
