import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/response/common.response';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { QueryFeedDto } from './dto/query-feed.dto';
import { ApiGetFeedList, ApiSearchFeed } from './feed.api-docs';
import { SearchFeedReq } from './dto/search-feed.dto';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

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
