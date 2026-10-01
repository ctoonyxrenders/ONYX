"use client";
// src/components/home/FAQ.tsx
//
// One accordion item. The question is a real <button> inside a heading — the
// accessible accordion pattern — so it works with keyboard and screen readers,
// not just a mouse.

import React, { useId, useState } from "react";
import { BODY } from "@/components/shared/typography";

/** Question and answer share horizontal padding, so their text lines up. */
const PAD_X = "px-4 md:px-5";

function FAQ({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = useId();

  return (
    <div className="w-full border border-black/15 hover:border-[#114046]/40 transition-colors">
      <h3>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className={`${PAD_X} py-4 md:py-5 w-full flex items-center justify-between gap-4 text-left`}
        >
          <span
            className={`${BODY} flex-1 transition-colors duration-300 ${
              isOpen ? "text-[#114046]" : "text-black"
            }`}
          >
            {question}
          </span>

          {/* Circular +, rotating to × when open. */}
          <span
            aria-hidden="true"
            className={`shrink-0 flex items-center justify-center rounded-full bg-black/5 w-6 h-6 lg:w-7 lg:h-7 text-base leading-none transition-transform duration-300 ${
 isOpen ? "rotate-45 text-[#114046]" : "rotate-0"
 }`}
          >
            +
          </span>
        </button>
      </h3>

      {/* grid-rows animates from 0 to the content's true height, so long
          answers are never clipped. */}
      <div
        id={answerId}
        role="region"
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className={`${BODY} ${PAD_X} text-black/50 pb-4 md:pb-5 `}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;