import { ConflictException, Injectable } from '@nestjs/common';
import { RssRepository } from './rss.repository';
import { RssRegisterDto } from './dto/rss-register.dto';
import { BlogRepository } from '../blog/blog.repository';

@Injectable()
export class RssService {
  constructor(
    private readonly rssRepository: RssRepository,
    private readonly blogRepository: BlogRepository,
  ) {}

  async registerRss(rssRegisterDto: RssRegisterDto) {
    const alreadyURLRss = await this.rssRepository.findOne({
      where: {
        rssURL: rssRegisterDto.rssURL,
      },
    });

    const alreadyURLBlog = await this.blogRepository.findOne({
      where: {
        rssURL: rssRegisterDto.rssURL,
      },
    });

    if (alreadyURLRss) {
      throw new ConflictException('이미 신청된 RSS URL입니다.');
    }

    if (alreadyURLBlog) {
      throw new ConflictException('이미 등록된 RSS URL입니다.');
    }

    await this.rssRepository.insertNewRss(rssRegisterDto);
  }

  async getAllRss() {
    return await this.rssRepository.find();
  }
}
