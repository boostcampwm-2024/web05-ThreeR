import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Rss } from './rss.entity';
import { RssRegisterDto } from './dto/rss-register.dto';

@Injectable()
export class RssRepository extends Repository<Rss> {
  constructor(private dataSource: DataSource) {
    super(Rss, dataSource.createEntityManager());
  }

  async insertNewRss(rssRegisterDto: RssRegisterDto) {
    const { blog, name, email, rssURL } = rssRegisterDto;
    const rssObj = this.create({
      name: blog,
      userName: name,
      email,
      rssURL,
    });
    await this.save(rssObj);
  }
}
