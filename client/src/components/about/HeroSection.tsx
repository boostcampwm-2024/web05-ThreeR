import { ChevronsDown } from "lucide-react";

import { Section } from "@/components/about/Section.tsx";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo-denamu-main.svg";

export const HeroSection = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Section className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-4xl">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <img src={logo} className="w-52" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#27ae60] via-[#2596be] to-[#228be6]">
          개발자를 위한 최고의 블로그 허브
        </h1>
        <p className="text-xl mb-8">기술 블로그를 한눈에 모아보고, 개발자들과 함께 성장하세요.</p>
        <div className="flex items-center justify-center space-x-4">
          <Button size="lg" onClick={scrollToBottom}>
            바로 시작하기
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronsDown className="w-12 h-12 text-gray-400 animate-slow-bounce" />
      </div>
    </Section>
  );
};
