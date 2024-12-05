import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiResponse } from '../common/response/common.response';
import { ApiTags } from '@nestjs/swagger';
import { StatisticQueryDto } from './dto/statistic-query.dto';
import { ApiReadPlatformStatistic } from './api-docs/readPlatformStatistic.api-docs';
import { ApiStatistic } from './api-docs/statistic.api-docs';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @ApiStatistic('today')
  @Get('today')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async readTodayStatistic(@Query() queryObj: StatisticQueryDto) {
    const data = await this.statisticService.readTodayStatistic(queryObj.limit);
    return ApiResponse.responseWithData('금일 조회수 통계 조회 완료', data);
  }

  @ApiStatistic('all')
  @Get('all')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async readAllStatistic(@Query() queryObj: StatisticQueryDto) {
    const data = await this.statisticService.readAllStatistic(queryObj.limit);
    return ApiResponse.responseWithData('전체 조회수 통계 조회 완료', data);
  }

  @ApiReadPlatformStatistic()
  @Get('platform')
  async readPlatformStatistic() {
    const data = await this.statisticService.readPlatformStatistic();
    return ApiResponse.responseWithData('블로그 플랫폼 통계 조회 완료', data);
  }
}
