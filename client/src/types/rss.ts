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
