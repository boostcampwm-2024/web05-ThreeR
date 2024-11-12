import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const AdminNavigationMenu = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>RSS 관리</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-48 gap-1 p-2">
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    등록 요청
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    RSS 목록
                  </Button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>회원 관리</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-48 gap-1 p-2">
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    회원 목록
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start">
                    권한 관리
                  </Button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
