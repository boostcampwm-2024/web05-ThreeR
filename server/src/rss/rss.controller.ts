import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CookieAuthGuard } from '../common/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RssService } from './rss.service';
import { RssRegisterDto } from './dto/rss-register.dto';
import { ApiResponse } from '../common/response/common.response';
import { RejectRssDto } from './dto/rss-reject.dto';
import { RssManagementDto } from './dto/rss-management.dto';
import { ApiCreateRss } from './api-docs/createRss.api-docs';
import { ApiAcceptRss } from './api-docs/acceptRss.api-docs';
import { ApiReadAcceptHistory } from './api-docs/readAcceptHistoryRss.api-docs';
import { ApiReadRejectHistory } from './api-docs/readRejectHistoryRss.api-docs';
import { ApiReadAllRss } from './api-docs/readAllRss.api-docs';
import { ApiRejectRss } from './api-docs/rejectRss.api-docs';

@ApiTags('RSS')
@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @ApiCreateRss()
  @Post()
  @UsePipes(ValidationPipe)
  async createRss(@Body() rssRegisterDto: RssRegisterDto) {
    await this.rssService.createRss(rssRegisterDto);
    return ApiResponse.responseWithNoContent('신청이 완료되었습니다.');
  }

  @ApiReadAllRss()
  @Get()
  @HttpCode(200)
  async readAllRss() {
    return ApiResponse.responseWithData(
      'Rss 조회 완료',
      await this.rssService.readAllRss(),
    );
  }

  @ApiAcceptRss()
  @UseGuards(CookieAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('accept/:id')
  @HttpCode(201)
  async acceptRss(@Param() params: RssManagementDto) {
    const { id } = params;
    await this.rssService.acceptRss(id);
    return ApiResponse.responseWithNoContent('승인이 완료되었습니다.');
  }

  @ApiRejectRss()
  @UsePipes(ValidationPipe)
  @UseGuards(CookieAuthGuard)
  @Post('reject/:id')
  @HttpCode(201)
  async rejectRss(
    @Body() body: RejectRssDto,
    @Param() params: RssManagementDto,
  ) {
    const { id } = params;
    await this.rssService.rejectRss(id, body.description);
    return ApiResponse.responseWithNoContent('거절이 완료되었습니다.');
  }

  @ApiReadAcceptHistory()
  @UseGuards(CookieAuthGuard)
  @Get('history/accept')
  async readAcceptHistory() {
    const rssAcceptHistory = await this.rssService.readAcceptHistory();
    return ApiResponse.responseWithData(
      '승인 기록 조회가 완료되었습니다.',
      rssAcceptHistory,
    );
  }

  @ApiReadRejectHistory()
  @UseGuards(CookieAuthGuard)
  @Get('history/reject')
  async readRejectHistory() {
    const rssRejectHistory = await this.rssService.readRejectHistory();
    return ApiResponse.responseWithData(
      'RSS 거절 기록을 조회하였습니다.',
      rssRejectHistory,
    );
  }
}
