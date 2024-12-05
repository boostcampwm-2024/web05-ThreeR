import { Link } from "react-router-dom";

import { Section } from "@/components/about/Section.tsx";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Section id="cta-section" className="min-h-screen flex items-center px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">지금 바로 시작하세요</h2>
        <p className="text-gray-600 mb-8">개발자들의 인사이트 가득한 블로그 세상으로 초대합니다</p>
        <div className="flex items-center justify-center space-x-4">
          <Link to="/">
            <Button size="lg">블로그 둘러보기</Button>
          </Link>

          <Button variant="outline" size="lg" onClick={scrollToTop}>
            다시 알아보기
          </Button>
        </div>
      </div>
    </Section>
  );
};
