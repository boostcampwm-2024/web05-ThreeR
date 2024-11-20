import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/response/common.response';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
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
  ApiGetTrendList,
  ApiGetTrendSse,
} from './feed.api-docs';
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

  @ApiGetTrendList()
  @Get('trend')
  async getTrendList() {
    const responseData = await this.feedService.getTrendList();
    return ApiResponse.responseWithData('트렌드 피드 조회 완료', responseData);
  }

  @ApiGetTrendSse()
  @Sse('trend/sse')
  async sseTrendList() {
    return new Observable((observer) => {
      this.eventService.on('ranking-update', (trendData) => {
        observer.next({
          data: {
            message: '트렌드 피드 수신 완료',
            trendData,
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
}
