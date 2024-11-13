import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RssService } from './rss.service';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { RssRegisterDto } from './dto/rss-register.dto';
import { ApiGetRss, ApiPostRegisterRss } from './rss.api-docs';
import { Rss } from './rss.entity';
import { ApiResponse } from '../common/response/common.response';

@ApiTags('RSS')
@Controller('rss')
export class RssController {
  constructor(
    private readonly rssService: RssService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  @ApiPostRegisterRss()
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  postRegisterRss(@Body() rssRegisterDto: RssRegisterDto) {
    this.logger.log(rssRegisterDto);

    return {
      message: '신청이 완료되었습니다.',
      statusCode: 201,
    };
  }

  @ApiGetRss()
  @Get()
  @HttpCode(200)
  async getRss(): Promise<ApiResponse<Rss[]>> {
    return ApiResponse.responseWithData(
      'Rss 조회 완료',
      await this.rssService.getAllRss(),
    );
  }
}
