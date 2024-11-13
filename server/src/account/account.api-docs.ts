import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
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
  );
}
