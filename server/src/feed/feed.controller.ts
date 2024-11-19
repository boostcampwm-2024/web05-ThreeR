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
import { ApiGetFeedList } from './feed.api-docs';
import { SearchFeedDto } from './dto/search-feed.dto';

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

  @Get('search')
  @HttpCode(HttpStatus.OK)
  async searchFeed(@Query() searchFeedDto: SearchFeedDto) {
    await this.feedService.search(searchFeedDto);
    return ApiResponse.responseWithData('test', { a: 'test' });
  }
}
