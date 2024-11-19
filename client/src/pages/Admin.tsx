import { useState } from "react";

import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import AdminLogin from "@/components/admin/login/AdminLoginModal";
import { RssRequestSearchBar } from "@/components/admin/rss/RssSearchBar";

import { AdminTabs } from "../components/admin/layout/AdminTabs";

export default function Admin() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const renderElement = {
    loginPage: (
      <div className="min-h-screen bg-background">
        <AdminHeader setLogin={handleLogin} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RssRequestSearchBar />
          <AdminTabs />
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
