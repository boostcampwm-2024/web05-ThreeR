import { Routes, Route } from "react-router-dom";

import Admin from "@/pages/Admin";
import Home from "@/pages/Home";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
