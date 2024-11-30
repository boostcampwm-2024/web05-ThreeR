import { ReactNode } from "react";

interface AvatarProps {
  children?: ReactNode;
  className?: string;
}

export const mockAvatar = {
  Avatar: ({ children, className }: AvatarProps) => (
    <div className={className} data-testid="avatar">
      {children}
    </div>
  ),
  AvatarFallback: ({ children, className }: AvatarProps) => (
    <div className={className} data-testid="avatar-fallback">
      {children}
    </div>
  ),
};
