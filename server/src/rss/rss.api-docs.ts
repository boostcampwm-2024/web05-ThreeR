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
    ApiOkResponse({
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
          message: '승인처리 되었습니다.',
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
        example: {
          message: '거절처리 되었습니다.',
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
      description: '거부 사유가 없을 경우',
      schema: {
        example: {
          message: '거부 사유를 필수로 입력해야 합니다.',
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
        example: {
          message: 'RSS 승인 기록을 조회하였습니다.',
          data: [
            {
              id: 1,
              name: 'seok3765.log',
              userName: 'J235_조민석',
              email: 'seok3765@naver.com',
              rssUrl: 'https://v2.velog.io/rss/@seok3765',
            },
            {
              id: 2,
              name: 'seok3766.log',
              userName: '조민석',
              email: 'seok3766@naver.com',
              rssUrl: 'https://v2.velog.io/rss/@seok3766',
            },
          ],
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
        example: {
          message: 'RSS 거절 기록을 조회하였습니다.',
          data: [
            {
              id: 1,
              name: 'seok3765.log',
              userName: 'J235_조민석',
              email: 'seok3765@naver.com',
              rssUrl: 'https://v2.velog.io/rss/@seok3765',
              description: '개발 블로그가 아닙니다.',
            },
            {
              id: 2,
              name: 'seok3766.log',
              userName: '조민석',
              email: 'seok3766@naver.com',
              rssUrl: 'https://v2.velog.io/rss/@seok3766',
              description: '그냥',
            },
          ],
        },
      },
    }),
  );
}
