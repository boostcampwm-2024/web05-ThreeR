import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

export const AdminNavigationMenu = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button variant="ghost" className="w-full justify-start">
              RSS 목록
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant="ghost" className="w-full justify-start">
              회원 관리
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
