import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity({ name: 'feed' })
export class Feed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  createdAt: Date;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'view_count', nullable: false, default: 0 })
  viewCount: number;

  @Column({
    length: 255,
    nullable: false,
    unique: true,
  })
  path: string;

  @Column({
    length: 255,
    nullable: true,
  })
  thumbnail: string;

  @ManyToOne((type) => Blog, (blog) => blog.feeds, {
    nullable: false,
  })
  @JoinColumn({
    name: 'blog_id',
  })
  blog: Blog;
}
