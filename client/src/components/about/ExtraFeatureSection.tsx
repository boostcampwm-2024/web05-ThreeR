import { Section } from "@/components/about/Section";

import { EXTRA_FEATURES } from "@/constants/about";

export const ExtraFeatureSection = () => {
  return (
    <Section className="py-20 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="text-l font-bold mb-2 text-primary">{EXTRA_FEATURES.mainTitle}</h1>
          <p className="text-2xl font-semibold whitespace-pre-line leading-normal">{EXTRA_FEATURES.groupTitle}</p>
        </div>

        <div className="space-y-20">
          {EXTRA_FEATURES.sections.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.shortTitle}</h3>
                    </div>

                    <p className="text-gray-600 mb-6">{feature.description}</p>

                    <ul className="space-y-3">
                      {feature.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
