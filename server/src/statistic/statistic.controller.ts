import {
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTodayStatistic } from './statistic.api-docs';
import { StatisticService } from './statistic.service';
import { ApiResponse } from '../common/response/common.response';
import { ApiTags } from '@nestjs/swagger';
import { CookieAuthGuard } from '../common/guard/auth.guard';
import { StatisticQueryDto } from './dto/statistic-query.dto';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @ApiTodayStatistic()
  @UseGuards(CookieAuthGuard)
  @Get('today')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async getTodayStatistic(@Query() queryObj: StatisticQueryDto) {
    const data = await this.statisticService.getTodayViewCount(queryObj.limit);
    return ApiResponse.responseWithData('금일 조회수 통계 조회 완료', data);
  }
}
