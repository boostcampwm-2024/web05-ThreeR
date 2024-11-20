interface SearchHighlightProps {
  text: string;
  highlight: string;
}

export default function SearchHighlight({ text, highlight }: SearchHighlightProps) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

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
