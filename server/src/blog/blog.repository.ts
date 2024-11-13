import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogRepository extends Repository<Blog> {
  constructor(private readonly dataSource: DataSource) {
    super(Blog, dataSource.createEntityManager());
  }
}
