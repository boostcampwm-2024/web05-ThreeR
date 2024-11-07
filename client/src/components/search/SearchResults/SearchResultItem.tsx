import { SearchData } from "@/types/search";

export default function SearchResultItem({ title, author, description }: SearchData) {
  return (
    <div className="border-b pb-4">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{author}</p>
      {/* <p className="text-gray-700">{description}</p> */}
    </div>
  );
}
