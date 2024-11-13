import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
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
          status: 201,
          message: '생성 완료',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        example: {
          status: 400,
          message: '오류 메세지',
        },
      },
    }),
  );
}
