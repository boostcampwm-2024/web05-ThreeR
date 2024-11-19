import { useState } from "react";

import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import AdminLogin from "@/components/admin/login/AdminLoginModal";
import { RejectModal } from "@/components/admin/rss/RejectModal";
import { RssRequestSearchBar } from "@/components/admin/rss/RssSearchBar";

import { useAdminAccept } from "@/hooks/useRssActions";

import { AdminTabs } from "../components/admin/layout/AdminTabs";
import { AdminRssData, AdminRequest } from "@/types/rss";

export default function Admin() {
  const [selectedBlogName, setSelectedBlogName] = useState<string>();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const onSuccess = () => {
    console.log();
  };

  const onError = (error: any) => {
    console.log(error);
  };
  const { mutate } = useAdminAccept(onSuccess, onError);

  const handleAccept = (data: AdminRequest) => {
    mutate(data);
  };

  const handleAction = (request: AdminRssData, action: "approve" | "reject", data: AdminRequest) => {
    if (action === "reject") {
      setSelectedBlogName(request.name);
    } else {
      handleAccept(data);
    }
  };

  const renderElement = {
    loginPage: (
      <div className="min-h-screen bg-background">
        <AdminHeader setLogin={handleLogin} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RssRequestSearchBar />
          <AdminTabs onAction={handleAction} />
        </div>
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
