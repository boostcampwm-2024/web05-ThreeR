import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  RssRejectRepository,
  RssRepository,
  RssAcceptRepository,
} from './rss.repository';
import { RssRegisterDto } from './dto/rss-register.dto';
import { EmailService } from '../common/email/email.service';
import { DataSource } from 'typeorm';
import { Rss, RssReject, RssAccept } from './rss.entity';

@Injectable()
export class RssService {
  constructor(
    private readonly rssRepository: RssRepository,
    private readonly rssAcceptRepository: RssAcceptRepository,
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
      this.rssAcceptRepository.findOne({
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
        manager.save(RssAccept.fromRss(rss)),
        manager.delete(Rss, id),
      ]);
    });
    this.emailService.sendMail(rss.email, rss.userName, true);
  }

  async rejectRss(id: number, description: string) {
    const rss = await this.rssRepository.findOne({
      where: { id },
    });

    if (!rss) {
      throw new NotFoundException('존재하지 않는 rss 입니다.');
    }

    const result = await this.dataSource.transaction(async (manager) => {
      const [result] = await Promise.all([
        manager.remove(rss),
        manager.save(RssReject, {
          ...RssAccept.fromRss(rss),
          description,
        }),
      ]);
      return result;
    });
    this.emailService.sendMail(result.email, result.userName, false);
  }

  async acceptRssHistory() {
    return await this.rssAcceptRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async rejectRssHistory() {
    return await this.rssRejectRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }
}
