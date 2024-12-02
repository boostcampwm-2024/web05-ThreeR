import { ReactNode } from "react";

interface CommandProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}
interface CommandGroupProps extends CommandProps {
  heading?: string;
}

export const mockCommand = {
  Command: ({ children, className, onClick }: CommandProps) => (
    <div className={className} onClick={onClick} data-testid="command">
      {children}
    </div>
  ),
  CommandDialog: ({ children }: CommandProps) => <div data-testid="command-dialog">{children}</div>,
  CommandInput: ({ className, ...props }: CommandProps) => (
    <div className={className} data-testid="command-input" {...props}>
      {props.children}
    </div>
  ),
  CommandList: ({ children, className }: CommandProps) => (
    <div className={className} data-testid="command-list">
      {children}
    </div>
  ),
  CommandEmpty: ({ children }: CommandProps) => <div data-testid="command-empty">{children}</div>,
  CommandGroup: ({ children, className, heading }: CommandGroupProps) => (
    <div className={className} data-testid="command-group">
      {heading && <div data-testid="command-group-heading">{heading}</div>}
      {children}
    </div>
  ),
  CommandSeparator: ({ className }: CommandProps) => <div className={className} data-testid="command-separator" />,
  CommandItem: ({ children, className, onClick }: CommandProps) => (
    <div className={className} onClick={onClick} data-testid="command-item">
      {children}
    </div>
  ),
};
