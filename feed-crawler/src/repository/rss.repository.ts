import { mysqlConnection } from "../common/mysql-access";
import { RssObj } from "../common/types";

class RssRepository {
  public async selectAllRss(): Promise<RssObj[]> {
    const query = `SELECT id, rss_url as rssUrl, name as blogName, blog_platform as blogPlatform
        FROM rss_accept`;
    return mysqlConnection.executeQuery(query);
  }
}

export const rssRepository = new RssRepository();
