import { feedRepository } from "./repository/feed.repository";
import { rssRepository } from "./repository/rss.repository";
import logger from "./common/logger";
import { RssObj, FeedDetail, RawFeed } from "./common/types";
import { XMLParser } from "fast-xml-parser";
import { parse } from "node-html-parser";
import { unescape } from "html-escaper";
import { ONE_MINUTE } from "./common/constant";

export class FeedCrawler {
  private urlParser: URLParser;

  constructor() {
    this.urlParser = new URLParser();
  }

  async start() {
    await feedRepository.deleteRecentFeed();

    const rssObjects = await rssRepository.selectAllRss();

    if (!rssObjects || !rssObjects.length) {
      logger.info("등록된 RSS가 없습니다.");
      return;
    }

    const newFeedsByRss = await this.feedGroupByRss(rssObjects);
    const newFeeds = newFeedsByRss.flat();

    if (!newFeeds.length) {
      logger.info("새로운 피드가 없습니다.");
      return;
    }
    logger.info(`총 ${newFeeds.length}개의 새로운 피드가 있습니다.`);

    const insertedData = await feedRepository.insertFeeds(newFeeds);

    await feedRepository.setRecentFeedList(insertedData);
  }

  private async findNewFeeds(
    rssObj: RssObj,
    now: number
  ): Promise<FeedDetail[]> {
    try {
      const TIME_INTERVAL = process.env.TIME_INTERVAL
        ? parseInt(process.env.TIME_INTERVAL)
        : 1;
      const feeds = await this.fetchRss(rssObj.rssUrl);

      const filteredFeeds = feeds.filter((item) => {
        const pubDate = new Date(item.pubDate).setSeconds(0, 0);
        const timeDiff = (now - pubDate) / (ONE_MINUTE * TIME_INTERVAL);
        return timeDiff >= 0 && timeDiff < 1;
      });

      const detailedFeeds = await Promise.all(
        filteredFeeds.map(async (feed) => {
          const imageUrl = await this.urlParser.getImageUrl(feed.link);
          const date = new Date(feed.pubDate);
          const formattedDate = date
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          return {
            id: null,
            blogId: rssObj.id,
            blogName: rssObj.blogName,
            blogPlatform: rssObj.blogPlatform,
            pubDate: formattedDate,
            title: feed.title,
            link: decodeURIComponent(feed.link),
            imageUrl: imageUrl,
          };
        })
      );

      return detailedFeeds;
    } catch (err) {
      logger.warn(
        `[${rssObj.rssUrl}] 에서 데이터 조회 중 오류 발생으로 인한 스킵 처리. 오류 내용 : ${err}`
      );
      return [];
    }
  }
  private feedGroupByRss(rssObjects: RssObj[]) {
    const currentTime = new Date();
    return Promise.all(
      rssObjects.map(async (rssObj: RssObj) => {
        logger.info(
          `${rssObj.blogName}(${rssObj.rssUrl}) 에서 데이터 조회하는 중...`
        );
        return await this.findNewFeeds(rssObj, currentTime.setSeconds(0, 0));
      })
    );
  }

  private async fetchRss(rssUrl: string): Promise<RawFeed[]> {
    const xmlParser = new XMLParser();
    const response = await fetch(rssUrl, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`${rssUrl}에서 xml 추출 실패`);
    }
    const xmlData = await response.text();
    const objFromXml = xmlParser.parse(xmlData);
    if (Array.isArray(objFromXml.rss.channel.item)) {
      return objFromXml.rss.channel.item.map((item) => ({
        title: this.urlParser.customUnescape(item.title),
        link: item.link,
        pubDate: item.pubDate,
      }));
    } else {
      return [Object.assign({}, objFromXml.rss.channel.item)];
    }
  }
}

class URLParser {
  async getImageUrl(link: string) {
    const response = await fetch(link, {
      headers: {
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      throw new Error(`${link}에 GET 요청 실패`);
    }

    const htmlData = await response.text();
    const root = parse(htmlData);
    const metaImage = root.querySelector('meta[property="og:image"]');
    let imageUrl = metaImage?.getAttribute("content") ?? "";
    if (!imageUrl.length) {
      logger.warn(`${link}에서 사진 추출 실패`);
      return imageUrl;
    }
    if (!this.isUrlPath(imageUrl)) {
      imageUrl = this.getHttpOriginPath(link) + imageUrl;
    }
    return imageUrl;
  }

  private isUrlPath(imageUrl: string) {
    const reg = /^(http|https):\/\//;
    return reg.test(imageUrl);
  }

  private getHttpOriginPath(imageUrl: string) {
    const url = new URL(imageUrl);
    return url.origin;
  }

  customUnescape(text: string): string {
    const htmlEntities = {
      "&middot;": "·",
      "&nbsp;": " ",
    };
    Object.keys(htmlEntities).forEach((entity) => {
      const value = htmlEntities[entity];
      const regex = new RegExp(entity, "g");
      text = text.replace(regex, value);
    });

    return unescape(text);
  }
}
