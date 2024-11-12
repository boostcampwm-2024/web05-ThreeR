import { useState } from "react";

import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { RejectModal } from "@/components/admin/rss/RejectModal";
import { RssRequestSearchBar } from "@/components/admin/rss/RssSearchBar";

import { AdminTabs } from "../components/admin/layout/AdminTabs";
import { RssRequest } from "@/types/rss";

export default function Admin() {
  const [selectedBlogName, setSelectedBlogName] = useState<string>();

  const rssRequests: RssRequest[] = [
    {
      id: 1,
      blogName: "토스 테크",
      rssUrl: "https://toss.tech/rss",
      realName: "김철수",
      email: "kim@example.com",
      requestedAt: "2024-10-29 14:30",
      status: "pending",
    },
    {
      id: 2,
      blogName: "우아한형제들 기술 블로그",
      rssUrl: "https://techblog.woowahan.com/feed",
      realName: "이영희",
      email: "lee@example.com",
      requestedAt: "2024-10-29 13:15",
      status: "pending",
    },
  ];

  const handleAction = (request: RssRequest, action: "approve" | "reject") => {
    if (action === "reject") {
      setSelectedBlogName(request.blogName);
    } else {
      // TODO: 승인 로직 구현
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RssRequestSearchBar />
        <AdminTabs requests={rssRequests} onAction={handleAction} />
      </div>
      <RejectModal
        blogName={selectedBlogName}
        onSubmit={() => setSelectedBlogName(undefined)}
        onCancel={() => setSelectedBlogName(undefined)}
      />
    </div>
  );
}
