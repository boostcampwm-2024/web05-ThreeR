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
    const feedList = await this.feedService.getFeedList(queryFeedDto);
    const hasMore = this.feedService.existNextFeed(
      feedList,
      queryFeedDto.limit,
    );
    const lastId = this.feedService.getLastIdFromFeedList(feedList);
    const data = { result: feedList, lastId, hasMore };
    return ApiResponse.responseWithData('피드 조회 완료', data);
  }
}
