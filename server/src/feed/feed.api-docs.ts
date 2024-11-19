import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiGetFeedList() {
  return applyDecorators(
    ApiOperation({
      summary: `메인 화면 게시글 조회 API`,
    }),
    ApiQuery({
      name: 'lastId',
      required: false,
      type: Number,
      description: '마지막으로 받은 피드의 ID',
      example: 10,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: '한 번에 가져올 피드 수',
      example: 5,
      default: 12,
    }),
    ApiOkResponse({
      description: 'Ok',
      schema: {
        example: {
          message: '피드 조회 완료',
          data: {
            result: [
              {
                id: 24,
                author: '박엔지니어',
                title: 'ECS vs EKS 비교 분석',
                path: 'https://dev-park.dev/ecs-eks',
                createAt: '2024-03-11T06:30:00.000Z',
                thumbnail: 'https://dev-park.dev/thumbnails/containers.jpg',
                viewCount: 320,
              },
              {
                id: 23,
                author: '박엔지니어',
                title: 'S3 비용 최적화 가이드',
                path: 'https://dev-park.dev/s3-cost',
                createAt: '2024-03-12T02:40:00.000Z',
                thumbnail: 'https://dev-park.dev/thumbnails/s3.jpg',
                viewCount: 190,
              },
              {
                id: 22,
                author: '박엔지니어',
                title: 'DynamoDB 데이터 모델링',
                path: 'https://dev-park.dev/dynamodb-modeling',
                createAt: '2024-03-13T07:20:00.000Z',
                thumbnail: 'https://dev-park.dev/thumbnails/dynamodb.jpg',
                viewCount: 230,
              },
            ],
            lastId: 22,
            hasMore: true,
          },
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
  );
}
