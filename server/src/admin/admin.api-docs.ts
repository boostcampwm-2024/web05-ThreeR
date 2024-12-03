import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiPostRegisterAdmin() {
  return applyDecorators(
    ApiOperation({
      summary: `관리자 회원 가입 API`,
    }),
    ApiCreatedResponse({
      description: 'Created',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '성공적으로 관리자 계정이 생성되었습니다.',
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      example: {
        message: '오류 메세지',
      },
    }),
    ApiConflictResponse({
      description: 'Conflict',
      example: {
        message: '이미 존재하는 아이디입니다.',
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      example: {
        message: '인증되지 않은 요청입니다.',
      },
    }),
  );
}

export function ApiPostLoginAdmin() {
  return applyDecorators(
    ApiOperation({
      summary: `관리자 로그인 API`,
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '로그인이 성공적으로 처리되었습니다.',
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      example: {
        message: '오류 메세지',
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      example: {
        message: '아이디 혹은 비밀번호가 잘못되었습니다.',
      },
    }),
  );
}

export function ApiCheckAdminSessionId() {
  return applyDecorators(
    ApiOperation({
      summary: `관리자 페이지 출력을 위한 sessionId 확인 API`,
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '정상적인 sessionId입니다.',
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      example: {
        message: '인증되지 않은 요청입니다.',
      },
    }),
  );
}

export function ApiLogout() {
  return applyDecorators(
    ApiOperation({
      summary: '관리자 로그아웃 API',
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      example: {
        message: '로그아웃이 성공적으로 처리되었습니다.',
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      example: {
        message: '인증되지 않은 요청입니다.',
      },
    }),
  );
}
