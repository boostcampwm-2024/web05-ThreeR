import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RssService } from './rss.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RssRegisterDto } from './dto/rss-register.dto';
import {
  ApiPostRegisterRss,
  ApiGetRss,
  ApiAcceptRss,
  ApiRejectRss,
} from './rss.api-docs';
import { Logger } from 'winston';
import { ApiResponse } from '../common/response/common.response';

@ApiTags('RSS')
@Controller('rss')
export class RssController {
  constructor(
    private readonly rssService: RssService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @ApiPostRegisterRss()
  @Post()
  @UsePipes(ValidationPipe)
  async postRegisterRss(@Body() rssRegisterDto: RssRegisterDto) {
    this.logger.info(JSON.stringify(rssRegisterDto));
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
  @Post('accept/:id')
  @HttpCode(201)
  async acceptRss(@Param('id', ParseIntPipe) id: number) {
    await this.rssService.acceptRss(id);
    return ApiResponse.responseWithNoContent('승인이 완료되었습니다.');
  }

  @ApiRejectRss()
  @Delete('reject/:id')
  @HttpCode(204)
  async rejectRss(@Param('id', ParseIntPipe) id: number) {
    await this.rssService.rejectRss(id);
    return ApiResponse.responseWithNoContent('거절이 완료되었습니다.');
  }
}
