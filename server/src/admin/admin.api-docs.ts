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
        example: {
          message: '성공적으로 관리자 계정이 생성되었습니다.',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          message: '오류 메세지 출력',
        },
      },
    }),
    ApiConflictResponse({
      description: 'Conflict',
      schema: {
        example: {
          message: '이미 존재하는 계정입니다.',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        example: {
          message: '인증되지 않은 요청입니다.',
        },
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
        example: {
          message: '로그인이 성공적으로 처리되었습니다.',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          message: '오류 메세지 출력',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        example: {
          message: '아이디 혹은 비밀번호가 잘못되었습니다.',
        },
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
        example: {
          message: '정상적인 sessionId입니다.',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        example: {
          message: '인증되지 않은 요청입니다.',
        },
      },
    }),
  );
}
