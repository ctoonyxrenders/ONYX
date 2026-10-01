// src/components/shared/Highlight.tsx
//
// Renders text with any part wrapped in [square brackets] highlighted.
// "images in [four steps]" → images in <bold teal>four steps</bold teal>
//
// split() with a capture group puts the bracketed parts at odd indices.

export default function Highlight({
  text,
  className = "font-bold text-[#4a5f66]",
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/\[(.+?)\]/);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}