export default function FilterButton() {
  return (
    <div className="flex gap-2 mb-4">
      <button className="bg-gray-200 rounded px-4 py-2 text-sm">게시글 제목</button>
      <button className="bg-gray-200 rounded px-4 py-2 text-sm">블로거</button>
      <button className="bg-gray-200 rounded px-4 py-2 text-sm">블로그 이름</button>
    </div>
  );
}
