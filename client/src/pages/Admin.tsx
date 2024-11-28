import { useState, useEffect } from "react";

import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import AdminMember from "@/components/admin/layout/AdminMember";
import { AdminTabs } from "@/components/admin/layout/AdminTabs";
import AdminLogin from "@/components/admin/login/AdminLoginModal";
import { RssRequestSearchBar } from "@/components/admin/rss/RssSearchBar";

import { useAdminCheck } from "@/hooks/queries/useAdminAuth";

import Login from "@/assets/lottie/login";

export default function Admin() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { status, isLoading } = useAdminCheck();
  const [tap, setTap] = useState<"RSS" | "MEMBER">("RSS");

  useEffect(() => {
    setIsLogin(status === "success");
  }, [status]);

  const renderContent = () => {
    if (tap === "RSS") {
      return (
        <>
          <RssRequestSearchBar />
          <AdminTabs setLogout={() => setIsLogin(true)} />
        </>
      );
    }
    return <AdminMember />;
  };

  if (isLoading && !isLogin) return <Login />;

  return isLogin ? (
    <main className="min-h-screen bg-background">
      <AdminHeader setLogin={() => setIsLogin(false)} handleTap={setTap} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">{renderContent()} </div>
    </main>
  ) : (
    <AdminLogin setLogin={() => setIsLogin(true)} />
  );
}
