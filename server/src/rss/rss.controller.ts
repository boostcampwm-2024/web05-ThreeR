import {
  Body,
  Controller,
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
import { ApiPostRegisterRss } from './rss.api-docs';

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
}
