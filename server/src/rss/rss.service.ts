import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rss } from './rss.entity';

@Injectable()
export class RssService {
  constructor(
    @InjectRepository(Rss)
    private readonly rssRepository: Repository<Rss>,
  ) {}

  async getAllRss(): Promise<Rss[]> {
    return await this.rssRepository.find();
  }
}
