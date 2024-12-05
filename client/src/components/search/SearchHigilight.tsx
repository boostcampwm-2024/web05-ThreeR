interface SearchHighlightProps {
  text: string;
  highlight: string;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function SearchHighlight({ text, highlight }: SearchHighlightProps) {
  const escapedHighlight = escapeRegExp(highlight);
  const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="font-black text-black">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}
