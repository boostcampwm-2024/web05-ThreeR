import { useState, useEffect } from "react";

import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminTabs } from "@/components/admin/layout/AdminTabs";
import AdminLogin from "@/components/admin/login/AdminLoginModal";
import { RssRequestSearchBar } from "@/components/admin/rss/RssSearchBar";

import { useAdminCheck } from "@/hooks/queries/useAdminAuth";

import Login from "@/assets/lottie/login";

export default function Admin() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { status, isLoading } = useAdminCheck();

  useEffect(() => {
    if (status === "success") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [status, isLoading]);

  if (isLoading) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return isLogin ? (
    <div className="min-h-screen bg-background">
      <AdminHeader setLogin={() => setIsLogin(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RssRequestSearchBar />
        <AdminTabs />
      </div>
    </div>
  ) : (
    <AdminLogin setLogin={() => setIsLogin(true)} />
  );
}
