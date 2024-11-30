export type RssRequestStatus = "pending" | "approved" | "rejected";

export interface RssRequest {
  id?: number;
  blogName: string; // 블로그명
  rssUrl: string; // RSS URL
  realName: string; // 실명
  email: string; // 이메일
  requestedAt: string; // 요청 시간
  status: RssRequestStatus; // 상태
  rejectReason?: string; // 거부 사유 (거부된 경우)
  approvedAt?: string; // 승인 시간
  rejectedAt?: string; // 거부 시간
}

//관리자 rss 관리시 사용
export interface AdminRssData {
  id: number;
  name: string;
  userName: string;
  email: string;
  rssUrl: string;
  description?: string;
}
export interface AdminRss {
  message: string;
  data: AdminRssData[];
}

export type AdminResponse = {
  message: string;
};
export type AdminRequest = {
  id: number;
  rejectMessage?: string;
};

// rss 등록시 사용
export interface RegisterRss {
  blog: string; // 블로거명
  name: string; // 신청자 이름
  email: string; // 신청자 이메일
  rssUrl: string; // 블로그 Rss URL
}

export interface RegisterResponse {
  message: string; // 응답 메시지
}
