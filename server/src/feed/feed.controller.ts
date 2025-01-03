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
import { Response, Request } from 'express';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiReadFeedPagination } from './api-docs/readFeedPagination.api-docs';
import { ApiReadTrendFeedList } from './api-docs/readTrendFeedList.api-docs';
import { ApiSearchFeedList } from './api-docs/searchFeedList.api-docs';
import { ApiUpdateFeedViewCount } from './api-docs/updateFeedViewCount.api-docs';
import { ApiReadRecentFeedList } from './api-docs/readRecentFeedList.api-docs';
import { Feed } from './feed.entity';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly eventService: EventEmitter2,
  ) {}

  @ApiReadFeedPagination()
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async readFeedPagination(@Query() queryFeedDto: QueryFeedDto) {
    return ApiResponse.responseWithData(
      '피드 조회 완료',
      await this.feedService.readFeedPagination(queryFeedDto),
    );
  }

  @ApiReadTrendFeedList()
  @Sse('trend/sse')
  async readTrendFeedList() {
    return new Observable((observer) => {
      this.feedService.readTrendFeedList().then((trendData) => {
        observer.next({
          data: {
            message: '현재 트렌드 피드 수신 완료',
            data: trendData,
          },
        });
      });
      this.eventService.on('ranking-update', (trendData: Feed[]) => {
        observer.next({
          data: {
            message: '새로운 트렌드 피드 수신 완료',
            data: trendData,
          },
        });
      });
    });
  }

  @ApiSearchFeedList()
  @Get('search')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
    new ValidationPipe(),
  )
  async searchFeedList(@Query() searchFeedReq: SearchFeedReq) {
    const data = await this.feedService.searchFeedList(searchFeedReq);
    return ApiResponse.responseWithData('검색 결과 조회 완료', data);
  }

  @ApiUpdateFeedViewCount()
  @Post('/:feedId')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateFeedViewCount(
    @Param('feedId') feedId: number,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.feedService.updateFeedViewCount(feedId, request, response);
    return ApiResponse.responseWithNoContent(
      '요청이 성공적으로 처리되었습니다.',
    );
  }

  @ApiReadRecentFeedList()
  @Get('/recent')
  @HttpCode(HttpStatus.OK)
  async readRecentFeedList() {
    return ApiResponse.responseWithData(
      '최신 피드 업데이트 완료',
      await this.feedService.readRecentFeedList(),
    );
  }
}
