import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/response/common.response';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { QueryFeedDto } from './dto/query-feed.dto';
import { ApiGetFeedList } from './feed.api-docs';

@ApiTags('Feed')
@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiGetFeedList()
  @Get('')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async getFeedList(@Query() queryFeedDto: QueryFeedDto) {
    this.logger.info(JSON.stringify(queryFeedDto));
    const feedList = await this.feedService.getFeedList(queryFeedDto);
    const lastId = this.feedService.getLastIdFromFeedList(feedList);
    const data = { result: feedList, lastId: lastId };
    this.logger.info(JSON.stringify(data));
    return ApiResponse.responseWithData('피드 조회 완료', data);
  }
}
