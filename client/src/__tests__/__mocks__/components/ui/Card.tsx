import { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CardContentProps {
  children?: ReactNode;
  className?: string;
}

export const mockCard = {
  Card: ({ children, className, onClick }: CardProps) => (
    <div className={className} onClick={onClick} role="button">
      {children}
    </div>
  ),
  CardContent: ({ children, className }: CardContentProps) => (
    <div className={className} data-testid="card-content">
      {children}
    </div>
  ),
  CardHeader: ({ children, className }: CardContentProps) => (
    <div className={className} data-testid="card-header">
      {children}
    </div>
  ),
  CardFooter: ({ children, className }: CardContentProps) => (
    <div className={className} data-testid="card-footer">
      {children}
    </div>
  ),
  CardTitle: ({ children, className }: CardContentProps) => (
    <div className={className} data-testid="card-title">
      {children}
    </div>
  ),
  CardDescription: ({ children, className }: CardContentProps) => (
    <div className={className} data-testid="card-description">
      {children}
    </div>
  ),
};
