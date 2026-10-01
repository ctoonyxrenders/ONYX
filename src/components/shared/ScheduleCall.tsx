"use client";
// src/components/shared/ScheduleCall.tsx
//
// EXTRACTED from src/app/studio/ScheduleCall.tsx so service pages can reuse it
// instead of duplicating a second Calendly implementation.
//
// Two fixes applied while extracting:
//   1. The original had a dangling `xl:` variant with no utility after it,
//      which Tailwind silently discarded.
//   2. The original mobile height was h-[180vh] — nearly two full screens of
//      mostly empty space below the widget.
//
// The #scheduleCall anchor is preserved: the header's "Contact Us" link and
// every service CTA point at /studio/#scheduleCall.

import { InlineWidget } from "react-calendly";

const CALENDLY_URL = "https://calendly.com/awais-onyxrenders/30min";

export default function ScheduleCall({
  heading = "Schedule A Call",
}: {
  heading?: string;
}) {
  return (
    <div
      id="scheduleCall"
      className="p-4 h-[125vh] md:h-[115vh] lg:h-[105vh] xl:h-[95vh] overflow-hidden"
    >
      <h2 className="text-center heading">{heading}</h2>
      <InlineWidget
        styles={{ height: "100%", width: "100%" }}
        url={CALENDLY_URL}
      />
    </div>
  );
}