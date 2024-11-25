import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/response/common.response';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  Sse,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { QueryFeedDto } from './dto/query-feed.dto';
import { SearchFeedReq } from './dto/search-feed.dto';
import {
  ApiGetFeedList,
  ApiSearchFeed,
  ApiUpdateFeedViewCount,
  ApiGetTrendSse,
} from './feed.api-docs';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly eventService: EventEmitter2,
  ) {}

  @ApiGetFeedList()
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async getFeedList(@Query() queryFeedDto: QueryFeedDto) {
    return ApiResponse.responseWithData(
      '피드 조회 완료',
      await this.feedService.getFeedData(queryFeedDto),
    );
  }

  @ApiGetTrendSse()
  @Sse('trend/sse')
  async sseTrendList() {
    return new Observable((observer) => {
      this.feedService.getTrendList().then((trendData) => {
        observer.next({
          data: {
            message: '현재 트렌드 피드 수신 완료',
            data: trendData,
          },
        });
      });
      this.eventService.on('ranking-update', (trendData) => {
        observer.next({
          data: {
            message: '새로운 트렌드 피드 수신 완료',
            data: trendData,
          },
        });
      });
    });
  }

  @ApiSearchFeed()
  @Get('search')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
    new ValidationPipe(),
  )
  async searchFeed(@Query() searchFeedReq: SearchFeedReq) {
    const data = await this.feedService.search(searchFeedReq);
    return ApiResponse.responseWithData('검색 결과 조회 완료', data);
  }

  @ApiUpdateFeedViewCount()
  @Post('/:feedId')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateFeedViewCount(
    @Param('feedId') feedId: number,
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const cookie = request.headers.cookie;
    const ip =
      request.headers['CF-Connecting-IP'] ||
      request.headers['x-forwarded-for'] ||
      request.socket?.remoteAddress ||
      'unknown';
    await this.feedService.updateFeedViewCount(feedId, ip, cookie, response);
    return ApiResponse.responseWithNoContent(
      '요청이 성공적으로 처리되었습니다.',
    );
  }
}
