import { ConflictException, Injectable } from '@nestjs/common';
import { RssRepository } from './rss.repository';
import { RssRegisterDto } from './dto/rss-register.dto';

@Injectable()
export class RssService {
  constructor(private readonly rssRepository: RssRepository) {}

  async registerRss(rssRegisterDto: RssRegisterDto) {
    const alreadyURL = await this.rssRepository.findOne({
      where: {
        rssURL: rssRegisterDto.rssURL,
      },
    });

    if (alreadyURL) {
      throw new ConflictException('이미 등록된 RSS URL입니다.');
    }

    await this.rssRepository.insertNewRss(rssRegisterDto);
  }
}
