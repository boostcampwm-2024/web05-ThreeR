export interface FeatureItem {
  shortTitle: string;
  longTitle: string;
  description: string;
  icon: React.ElementType;
  imageSrc?: string;
  imageAlt?: string;
}

export interface Feature {
  mainTitle: string;
  groupTitle: string;
  features: FeatureItem[];
}

export interface ExtraFeature {
  shortTitle: string;
  description: string;
  items: string[];
  icon: React.ElementType;
}

export interface ExtraFeatureSection {
  mainTitle: string;
  groupTitle: string;
  sections: {
    title: string;
    features: ExtraFeature[];
  }[];
}
