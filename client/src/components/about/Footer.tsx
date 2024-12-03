import { footerLinks, teamMembers } from "@/constants/footer";

import type { FooterLink } from "@/types/footer";

export const Footer = () => {
  const renderFooterLink = (link: FooterLink) => (
    <div className="flex flex-col space-y-2">
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col space-y-2 hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-2 text-gray-500">
          <link.icon className="w-4 h-4" />
          <span className="text-sm">{link.label}</span>
        </div>
        <span className="text-sm font-medium">{link.value}</span>
      </a>
      {link.subLinks?.map((subLink, subIdx) => (
        <a
          key={subIdx}
          href={subLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-primary transition-colors ml-6"
        >
          {subLink.label}
        </a>
      ))}
    </div>
  );

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((link, idx) => (
            <div key={idx}>{renderFooterLink(link)}</div>
          ))}
        </div>

        <div className="mt-8 pt-8">
          <div className="text-center text-[10px] text-gray-500">
            <span>Made by </span>
            {teamMembers.map((name, idx) => (
              <span key={idx}>
                {name}
                {idx !== teamMembers.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
