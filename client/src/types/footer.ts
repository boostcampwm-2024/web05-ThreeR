import { LucideIcon } from "lucide-react";

export interface FooterSubLink {
  label: string;
  href: string;
}

export interface FooterLink {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  subLinks?: FooterSubLink[];
}
