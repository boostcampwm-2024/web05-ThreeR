import { useInView } from "@/hooks/common/useInView";

import { cn } from "@/lib/utils";
import { FeatureItem } from "@/types/about";

interface FeatureCardProps {
  feature: FeatureItem;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ once: true });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {feature.imageSrc ? (
          <img src={feature.imageSrc} alt={feature.imageAlt} className="w-full aspect-video object-cover" />
        ) : (
          <div className="w-full aspect-video flex items-center justify-center">
            <span>이미지 준비 중</span>
          </div>
        )}

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-8 text-primary" />
            <h4 className="text-l font-semibold text-primary">{feature.shortTitle}</h4>
          </div>
          <h3 className="text-2xl font-bold">{feature.longTitle}</h3>
          <p className="text-lg pt-6 text-gray-400 font-semibold whitespace-pre-line">{feature.description}</p>
        </div>
      </div>
    </div>
  );
};
