import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

import { PLATFORMS, PlatformType } from "@/constants/rss";

interface PlatformSelectorProps {
  platform: PlatformType;
  onPlatformChange: (platform: string) => void;
}

export const PlatformSelector = ({ platform, onPlatformChange }: PlatformSelectorProps) => {
  return (
    <Tabs defaultValue="tistory" value={platform} onValueChange={onPlatformChange}>
      <TabsList className="grid w-full grid-cols-4 ">
        {Object.entries(PLATFORMS).map(([key, { name }]) => (
          <TabsTrigger key={key} value={key}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
