import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import "./api/searchMockApi";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
