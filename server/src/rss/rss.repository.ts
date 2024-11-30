import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Rss, RssAccept, RssReject } from './rss.entity';
import { RssRegisterDto } from './dto/rss-register.dto';

@Injectable()
export class RssRepository extends Repository<Rss> {
  constructor(private dataSource: DataSource) {
    super(Rss, dataSource.createEntityManager());
  }

  async insertNewRss(rssRegisterDto: RssRegisterDto) {
    const { blog, name, email, rssUrl } = rssRegisterDto;
    const rssObj = this.create({
      name: blog,
      userName: name,
      email,
      rssUrl,
    });
    await this.save(rssObj);
  }
}

@Injectable()
export class RssRejectRepository extends Repository<RssReject> {
  constructor(private dataSource: DataSource) {
    super(RssReject, dataSource.createEntityManager());
  }
}

@Injectable()
export class RssAcceptRepository extends Repository<RssAccept> {
  constructor(private readonly dataSource: DataSource) {
    super(RssAccept, dataSource.createEntityManager());
  }

  countByBlogPlatform() {
    return this.createQueryBuilder()
      .select(['blog_platform as platform'])
      .addSelect('COUNT(blog_platform)', 'count')
      .groupBy('blog_platform')
      .orderBy('count', 'DESC')
      .getRawMany();
  }
}
