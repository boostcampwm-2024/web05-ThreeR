import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RssRejectRepository, RssRepository } from './rss.repository';
import { RssRegisterDto } from './dto/rss-register.dto';
import { BlogRepository } from '../blog/blog.repository';
import { Blog } from '../blog/blog.entity';
import { EmailService } from '../common/email/email.service';
import { DataSource } from 'typeorm';
import { Rss, RssReject } from './rss.entity';

@Injectable()
export class RssService {
  constructor(
    private readonly rssRepository: RssRepository,
    private readonly blogRepository: BlogRepository,
    private readonly emailService: EmailService,
    private readonly rssRejectRepository: RssRejectRepository,
    private readonly dataSource: DataSource,
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

    await this.dataSource.transaction(async (manager) => {
      await Promise.all([
        manager.save(Blog.fromRss(rss)),
        manager.delete(Rss, id),
      ]);
    });
    this.emailService.sendMail(rss, true);
  }

  async rejectRss(id: number, description: string) {
    const rss = await this.rssRepository.findOne({
      where: { id },
    });

    if (!rss) {
      throw new NotFoundException('존재하지 않는 rss 입니다.');
    }

    const result = await this.dataSource.transaction(async (manager) => {
      const [transactionResult] = await Promise.all([
        manager.remove(rss),
        manager.save(RssReject, {
          ...rss,
          description: description,
        }),
      ]);
      return transactionResult;
    });
    this.emailService.sendMail(result, false, description);
  }

  async acceptRssHistory() {
    return await this.blogRepository.find();
  }

  async rejectRssHistory() {
    return await this.rssRejectRepository.find();
  }
}
