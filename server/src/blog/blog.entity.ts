import { Feed } from '../feed/feed.entity';
import { RssInformation } from '../rss/rss.entity';
import { Entity, OneToMany } from 'typeorm';
import { Rss } from '../rss/rss.entity';

@Entity({
  name: 'blog',
})
export class Blog extends RssInformation {
  @OneToMany((type) => Feed, (feed) => feed.blog)
  feeds: Feed[];

  static fromRss(rss: Rss) {
    const blog = new Blog();
    blog.name = rss.name;
    blog.userName = rss.userName;
    blog.email = rss.email;
    blog.rssURL = rss.rssURL;
    blog.feeds = [];

    return blog;
  }
}
