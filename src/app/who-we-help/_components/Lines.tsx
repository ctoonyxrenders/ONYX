// src/app/who-we-help/_components/Lines.tsx
//
// Renders each entry on its own line. Used inside headings, so the line
// breaks are decided in content, not in markup.

export default function Lines({ lines }: { lines: string[] }) {
  return lines.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}
