import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function ApiUpdateFeedViewCount() {
  return applyDecorators(
    ApiOperation({
      summary: `피드 조회수 업데이트 API`,
    }),
    ApiParam({
      name: 'feedId',
      required: true,
      type: Number,
      description: '클릭한 피드의 id',
      example: 1,
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
        message: '요청이 성공적으로 처리되었습니다.',
      },
    }),
    ApiNotFoundResponse({
      description: '해당 ID의 피드가 존재하지 않는 경우',
      example: {
        message: '{feedId}번 피드를 찾을 수 없습니다.',
      },
    }),
  );
}
