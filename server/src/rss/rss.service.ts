import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RssRepository } from './rss.repository';
import { RssRegisterDto } from './dto/rss-register.dto';
import { BlogRepository } from '../blog/blog.repository';
import { Blog } from '../blog/blog.entity';
import { EmailService } from '../common/email/email.service';

@Injectable()
export class RssService {
  constructor(
    private readonly rssRepository: RssRepository,
    private readonly blogRepository: BlogRepository,
    private readonly emailService: EmailService,
  ) {}

  async registerRss(rssRegisterDto: RssRegisterDto) {
    const [alreadyURLRss, alreadyURLBlog] = await Promise.all([
      this.rssRepository.findOne({
        where: {
          rssUrl: rssRegisterDto.rssUrl,
        },
      }),
      this.blogRepository.findOne({
        where: {
          rssUrl: rssRegisterDto.rssUrl,
        },
      }),
    ]);

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
      where: { id },
    });

    if (!rss) {
      throw new NotFoundException('존재하지 않는 rss 입니다.');
    }

    await Promise.all([
      this.rssRepository.delete(id),
      this.blogRepository.save(Blog.fromRss(rss)),
    ]);
    this.emailService.sendMail(rss.email, rss.userName, true);
  }

  async rejectRss(id: number) {
    const rss = await this.rssRepository.findOne({
      where: { id },
    });

    if (!rss) {
      throw new NotFoundException('존재하지 않는 rss 입니다.');
    }

    const result = await this.rssRepository.remove(rss);
    this.emailService.sendMail(result.email, result.userName, false);
  }

  async acceptRssHistory() {
    return await this.blogRepository.find();
  }
}
