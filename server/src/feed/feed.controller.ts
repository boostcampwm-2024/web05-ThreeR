import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../common/response/common.response';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { QueryFeedDto } from './dto/query-feed.dto';
import {
  ApiGetFeedList,
  ApiSearchFeed,
  ApiGetTrendList,
  ApiUpdateFeedViewCount,
} from './feed.api-docs';
import { SearchFeedReq } from './dto/search-feed.dto';
import { Response } from 'express';

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

  @ApiGetTrendList()
  @Get('trend')
  async getTrendList() {
    const responseData = await this.feedService.getTrendList();
    return ApiResponse.responseWithData('트렌드 피드 조회 완료', responseData);
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
  @Get('/:feedId')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateFeedViewCount(
    @Param('feedId') feedId: number,
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const cookie = request.headers.cookie;
    const ip = request.headers[`CF-Connecting-IP`];
    await this.feedService.updateFeedViewCount(feedId, ip, cookie, response);
    return ApiResponse.responseWithNoContent(
      '요청이 성공적으로 처리되었습니다.',
    );
  }
}
