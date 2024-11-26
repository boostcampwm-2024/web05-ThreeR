import logger from "./logger.js";
import "dotenv/config";
import { selectAllRss, insertFeeds } from "./db-access.js";
import { FeedObj, FeedDetail, RawFeed } from "./types.js";
import { XMLParser } from "fast-xml-parser";
import { parse } from "node-html-parser";
import { unescape } from "html-escaper";

const xmlParser = new XMLParser();
const TIME_INTERVAL = process.env.TIME_INTERVAL
  ? parseInt(process.env.TIME_INTERVAL)
  : 1;

const getImageUrl = async (link: string): Promise<string> => {
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
  const imageUrl = metaImage?.getAttribute("content") ?? "";
  if (imageUrl.length === 0) logger.warn(`${link}에서 사진 추출 실패`);

  return imageUrl;
};

const fetchRss = async (rssUrl: string): Promise<RawFeed[]> => {
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
      title: customUnescape(item.title),
      link: item.link,
      pubDate: item.pubDate,
    }));
  } else {
    return [Object.assign({}, objFromXml.rss.channel.item)];
  }
};

const findNewFeeds = async (
  rssObj: FeedObj,
  now: number
): Promise<FeedDetail[]> => {
  try {
    const feeds = await fetchRss(rssObj.rssUrl);

    const filteredFeeds = feeds.filter((item) => {
      const pubDate = new Date(item.pubDate).setMinutes(0, 0, 0);
      const timeDiff = (now - pubDate) / (1000 * 60 * TIME_INTERVAL);
      return timeDiff >= 0 && timeDiff < 1;
    });

    const detailedFeeds = await Promise.all(
      filteredFeeds.map(async (feed) => {
        const imageUrl = await getImageUrl(feed.link);
        const date = new Date(feed.pubDate);
        const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");

        return {
          blogId: rssObj.id,
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
};

const customUnescape = (text: string): string => {
  text = text.replace(/&middot;/g, "·");
  return unescape(text);
};

export const performTask = async () => {
  const rssObjects = await selectAllRss();

  if (rssObjects.length === 0) {
    logger.info("등록된 RSS 피드가 없습니다.");
    return;
  }
  const currentTime = new Date();

  let idx = 0;
  const newFeeds = await Promise.all(
    rssObjects.map(async (rssObj) => {
      idx += 1;
      logger.info(
        `[${idx}번째 rss [${rssObj.rssUrl}] 에서 데이터 조회하는 중...`
      );
      return await findNewFeeds(rssObj, currentTime.setMinutes(0, 0, 0));
    })
  );

  const result = newFeeds.flat().sort((currentFeed, nextFeed) => {
    const dateCurrent = new Date(currentFeed.pubDate);
    const dateNext = new Date(nextFeed.pubDate);
    return dateCurrent.getTime() - dateNext.getTime();
  });

  if (result.length === 0) {
    logger.info("새로운 피드가 없습니다.");
    return;
  }

  logger.info(`총 ${result.length}개의 새로운 피드가 있습니다.`);
  await insertFeeds(result);
};
