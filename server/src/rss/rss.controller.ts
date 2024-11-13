import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RssService } from './rss.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RssRegisterDto } from './dto/rss-register.dto';
import { ApiPostRegisterRss } from './rss.api-docs';
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
}
