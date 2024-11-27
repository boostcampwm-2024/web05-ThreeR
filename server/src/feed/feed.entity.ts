import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RssAccept } from '../rss/rss.entity';

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

  @Index({ fulltext: true, parser: 'ngram' })
  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'view_count', nullable: false, default: 0 })
  viewCount: number;

  @Column({
    length: 512,
    nullable: false,
    unique: true,
  })
  path: string;

  @Column({
    length: 255,
    nullable: true,
  })
  thumbnail: string;

  @ManyToOne((type) => RssAccept, (rssAccept) => rssAccept.feeds, {
    nullable: false,
  })
  @JoinColumn({
    name: 'blog_id',
  })
  blog: RssAccept;

  constructor(partial?: Partial<Feed>) {
    super();
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
