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
      summary: `메인 화면 무한 스크롤 게시글 목록 API`,
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
          message: '성공적으로 관리자 계정이 생성되었습니다.',
          data: {
            result: [
              {
                feed_id: 14,
                feed_created_at: '2024-03-11T05:15:00.000Z',
                feed_title: 'Redux Toolkit 실전 가이드',
                feed_view_count: 180,
                feed_path: 'https://coding-lee.dev/redux-toolkit',
                feed_thumbnail: 'https://coding-lee.dev/thumbnails/redux.jpg',
                feed_blog_id: 2,
              },
              {
                feed_id: 13,
                feed_created_at: '2024-03-12T01:20:00.000Z',
                feed_title: 'Next.js 13 App Router 전환기',
                feed_view_count: 310,
                feed_path: 'https://coding-lee.dev/nextjs-13',
                feed_thumbnail: 'https://coding-lee.dev/thumbnails/nextjs.jpg',
                feed_blog_id: 2,
              },
              {
                feed_id: 12,
                feed_created_at: '2024-03-13T06:45:00.000Z',
                feed_title: 'React 18 새로운 기능 소개',
                feed_view_count: 290,
                feed_path: 'https://coding-lee.dev/react-18',
                feed_thumbnail: 'https://coding-lee.dev/thumbnails/react.jpg',
                feed_blog_id: 2,
              },
              {
                feed_id: 11,
                feed_created_at: '2024-03-14T02:30:00.000Z',
                feed_title: 'TypeScript 4.9 업데이트 정리',
                feed_view_count: 220,
                feed_path: 'https://coding-lee.dev/typescript-4-9',
                feed_thumbnail: 'https://coding-lee.dev/thumbnails/ts.jpg',
                feed_blog_id: 2,
              },
              {
                feed_id: 10,
                feed_created_at: '2024-03-05T00:45:00.000Z',
                feed_title: '모니터링 시스템 구축 가이드',
                feed_view_count: 160,
                feed_path: 'https://tech-kim.dev/monitoring',
                feed_thumbnail:
                  'https://tech-kim.dev/thumbnails/monitoring.jpg',
                feed_blog_id: 1,
              },
            ],
            lastId: 10,
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
