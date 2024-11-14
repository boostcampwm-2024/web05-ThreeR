import { useState } from "react";

import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import AdminLogin from "@/components/admin/login/AdminLoginModal";
import { RejectModal } from "@/components/admin/rss/RejectModal";
import { RssRequestSearchBar } from "@/components/admin/rss/RssSearchBar";

import { AdminTabs } from "../components/admin/layout/AdminTabs";
import { RssRequest } from "@/types/rss";

export default function Admin() {
  const [selectedBlogName, setSelectedBlogName] = useState<string>();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // 로그인 관리 함수
  const handleLogin = () => {
    // 로그인API나오면 수정해야함
    setIsLogin((prev) => !prev);
  };
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

  const renderElement = {
    loginPage: (
      <div className="min-h-screen bg-background">
        <AdminHeader setLogin={handleLogin} />
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
    ),
    logoutPage: <AdminLogin setLogin={handleLogin} />,
  };
  const renderFunction = () => {
    if (isLogin) return "loginPage";
    else return "logoutPage";
  };
  return renderElement[renderFunction()];
}
