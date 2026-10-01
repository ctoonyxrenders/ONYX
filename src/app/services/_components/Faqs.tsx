// src/app/services/_components/Faqs.tsx
import React from "react";
// Reuses the existing accordion from the Home page FAQ section.
import FAQ from "@/components/home/FAQ";
import type { FaqItem } from "../_types";

export default function Faqs({ items }: { items: FaqItem[] }) {
  if (!items?.length) return null;

  return (
    <section className="flex flex-col gap-8 md:gap-10 lg:gap-20 section">
      <h2 className="text-center heading">Frequently Asked Questions (FAQs)</h2>
      <div className="flex flex-col justify-start w-full items-start mx-auto gap-5">
        {items.map((item, index) => (
          <FAQ key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}