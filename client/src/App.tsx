import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingPage from "@/pages/Loading.tsx";

import { denamuAscii } from "@/constants/denamuAscii.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Home = lazy(() => import("@/pages/Home"));
const Admin = lazy(() => import("@/pages/Admin"));
const AboutService = lazy(() => import("@/pages/AboutService"));

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    console.log(denamuAscii);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Admin />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<LoadingPage />}>
              <AboutService />
            </Suspense>
          }
        />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
