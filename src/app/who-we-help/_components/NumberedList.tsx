// src/app/who-we-help/_components/NumberedList.tsx
//
// "01 / title / body" columns. Numbers come from position, so content only
// supplies titles and text. Stacks on mobile.
//   columns 3  side by side from md              (Section A)
//   columns 4  two per row from md, four from lg (Section C)
//   ruled      thin line above each item         (Section C)
//   divided    vertical line between items, once they sit side by side;
//              columns 3 only, where every item shares one row (Section A)

import { BODY, SMALL } from "@/components/shared/typography";
import type { TextItem } from "../_types";

const COLUMNS = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

export default function NumberedList({
  items,
  columns = 3,
  ruled = false,
  divided = false,
}: {
  items: TextItem[];
  columns?: keyof typeof COLUMNS;
  ruled?: boolean;
  divided?: boolean;
}) {
  // Divided lists replace the column gap with padding either side of the
  // line, so the line sits centred between two items.
  const listClass = divided ? "md:gap-x-0 md:divide-x md:divide-black/15" : "";
  const itemClass = [
    ruled && "border-t border-light pt-4 md:pt-5",
    divided && "md:px-5 lg:px-8 md:first:pl-0 md:last:pr-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ol className={`grid grid-cols-1 ${COLUMNS[columns]} gap-8 md:gap-10 ${listClass}`}>
      {items.map((item, index) => (
        <li key={item.title} className={itemClass || undefined}>
          <span className={`${SMALL} tracking-[0.2em] text-secondary`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={`${BODY} font-bold mt-2 md:mt-3`}>{item.title}</h3>
          <p className={`${BODY} mt-2 text-secondary text-justify`}>{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
