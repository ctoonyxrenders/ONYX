// src/components/shared/buttonStyles.ts
//
// Button styling constants and helpers.
//
// PRIMARY BUTTON CLASS: Use .btn-pill directly in JSX
//
// Example usage:
//   <button className="btn-pill bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035]">
//     Click me
//   </button>
//
// The .btn-pill class is defined in globals.css inside @layer components,
// ensuring it works seamlessly with Tailwind utilities and color classes.
//
// Color/state variants can be added with standard Tailwind classes:
//   - bg-[#114046] for background
//   - text-white for text color
//   - border border-[#114046] for borders
//   - hover:bg-[#0e3035] for hover states

export const BUTTON_THEME = "bg-[#114046] text-white border border-[#114046] hover:bg-[#0e3035]";
export const BUTTON_OUTLINE = "border border-[#114046] text-[#114046] hover:bg-[#114046] hover:text-white";
export const BUTTON_WHITE = "bg-white text-[#114046] border border-white hover:bg-transparent hover:text-white";