export const PLATFORM_TYPES = ["tistory", "velog", "medium", "personal_blog"] as const;
export type PlatformType = (typeof PLATFORM_TYPES)[number];

interface Platform {
  name: string;
  prefix: string;
  suffix: string;
  placeholder: string;
}

export const PLATFORMS: Record<PlatformType, Platform> = {
  tistory: {
    name: "Tistory",
    prefix: "https://",
    suffix: ".tistory.com/rss",
    placeholder: "서브도메인",
  },
  velog: {
    name: "Velog",
    prefix: "https://v2.velog.io/rss/@",
    suffix: "",
    placeholder: "사용자명",
  },
  medium: {
    name: "Medium",
    prefix: "https://medium.com/feed/@",
    suffix: "",
    placeholder: "사용자명",
  },
  personal_blog: {
    name: "개인 블로그",
    prefix: "https://",
    suffix: "",
    placeholder: "블로그 주소",
  },
};
