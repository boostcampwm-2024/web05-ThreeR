import { Section } from "@/components/about/Section.tsx";

import { FEATURES } from "@/constants/about";

import { FeatureCard } from "./FeatureCard";
import { cn } from "@/lib/utils";

export const FeatureSection = () => {
  return (
    <div>
      {FEATURES.map((feature, idx) => (
        <Section key={idx} className={cn("py-20 px-8", idx % 2 === 0 ? "bg-white" : "bg-gray-50")}>
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16">
              <div className="mb-12">
                <p className="text-l font-bold mb-2 text-primary">{feature.mainTitle}</p>
                <h2 className="text-2xl font-semibold whitespace-pre-line leading-normal">{feature.groupTitle}</h2>
              </div>

              <div className="space-y-20">
                {feature.features.map((featureItem, itemIdx) => (
                  <FeatureCard key={itemIdx} feature={featureItem} />
                ))}
              </div>
            </div>
          </div>
        </Section>
      ))}
    </div>
  );
};
