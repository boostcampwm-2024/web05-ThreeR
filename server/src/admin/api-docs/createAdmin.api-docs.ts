import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiCreateAdmin() {
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
        message: '이미 존재하는 계정입니다.',
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
