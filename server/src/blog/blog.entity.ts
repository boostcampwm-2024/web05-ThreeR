import { Feed } from '../feed/feed.entity';
import { RssInformation } from '../rss/rss.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Rss } from '../rss/rss.entity';

@Entity({
  name: 'blog',
})
export class Blog extends RssInformation {
  @OneToMany((type) => Feed, (feed) => feed.blog)
  feeds: Feed[];

  @Index({ fulltext: true, parser: 'ngram' })
  @Column({ name: 'name', nullable: false })
  name: string;

  static fromRss(rss: Rss) {
    const blog = new Blog();
    blog.name = rss.name;
    blog.userName = rss.userName;
    blog.email = rss.email;
    blog.rssUrl = rss.rssUrl;
    blog.feeds = [];

    return blog;
  }
}
