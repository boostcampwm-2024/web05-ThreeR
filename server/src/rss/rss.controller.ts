import {
  Body,
  Controller,
  Delete,
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
import {
  ApiPostRegisterRss,
  ApiGetRss,
  ApiAcceptRss,
  ApiRejectRss,
  ApiAcceptHistory,
} from './rss.api-docs';
import { ApiResponse } from '../common/response/common.response';

@ApiTags('RSS')
@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @ApiPostRegisterRss()
  @Post()
  @UsePipes(ValidationPipe)
  async postRegisterRss(@Body() rssRegisterDto: RssRegisterDto) {
    await this.rssService.registerRss(rssRegisterDto);
    return ApiResponse.responseWithNoContent('신청이 완료되었습니다.');
  }

  @ApiGetRss()
  @Get()
  @HttpCode(200)
  async getRss() {
    return ApiResponse.responseWithData(
      'Rss 조회 완료',
      await this.rssService.getAllRss(),
    );
  }

  @ApiAcceptRss()
  @UseGuards(CookieAuthGuard)
  @Post('accept/:id')
  @HttpCode(201)
  async acceptRss(@Param('id', ParseIntPipe) id: number) {
    await this.rssService.acceptRss(id);
    return ApiResponse.responseWithNoContent('승인이 완료되었습니다.');
  }

  @ApiRejectRss()
  @UseGuards(CookieAuthGuard)
  @Delete('reject/:id')
  @HttpCode(204)
  async rejectRss(@Param('id', ParseIntPipe) id: number) {
    await this.rssService.rejectRss(id);
    return ApiResponse.responseWithNoContent('거절이 완료되었습니다.');
  }

  @ApiAcceptHistory()
  @UseGuards(CookieAuthGuard)
  @Get('history/accept')
  async getHistoryAcceptRss() {
    const rssAcceptHistory = await this.rssService.acceptRssHistory();
    return ApiResponse.responseWithData(
      '승인 기록 조회가 완료되었습니다.',
      rssAcceptHistory,
    );
  }
}
