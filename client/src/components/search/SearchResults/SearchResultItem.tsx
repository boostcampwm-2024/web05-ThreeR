import { SearchData } from "@/types/search";
import { CommandItem } from "@/components/ui/command";
export default function SearchResultItem({ title, author }: SearchData) {
  return (
    <CommandItem className="flex flex-col items-start">
      <h3 className="font-bold text-sm">{title}</h3>
      <p className="text-sm text-gray-500">{author}</p>
    </CommandItem>
  );
}

// <CommandItem>
//   <User />
//   <span>Profile</span>
// </CommandItem>
// <CommandItem>
//   <CreditCard />
//   <span>Billing</span>
// </CommandItem>
// <CommandItem>
//   <Settings />
//   <span>Settings</span>
// </CommandItem>
