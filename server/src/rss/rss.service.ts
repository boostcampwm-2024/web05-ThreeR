import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RssRepository } from './rss.repository';
import { RssRegisterDto } from './dto/rss-register.dto';
import { BlogRepository } from '../blog/blog.repository';
import { Blog } from '../blog/blog.entity';

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

  async acceptRss(id: number) {
    const rss = await this.rssRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!rss) {
      throw new NotFoundException('존재하지 않는 rss 입니다.');
    }

    await this.rssRepository.delete(id);
    await this.blogRepository.save(Blog.fromRss(rss));
  }

  async rejectRss(id: number) {
    const result = await this.rssRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('존재하지 않는 rss 입니다.');
    }
  }
}
