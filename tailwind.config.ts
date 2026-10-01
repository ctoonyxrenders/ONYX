import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // The only breakpoints in the project. globals.css uses these through
      // @screen, so global styles and component classes always switch together.
      //
      // Public pages do not use 3xl:/4xl: classes for sizing. From 3xl up the
      // whole public layout scales with the viewport (see "Large screens" in
      // globals.css). These screens stay available for genuine layout changes.
      screens: {
        "3xl": "2048px",
        "4xl": "3840px",
      },
    },
  },
  plugins: [],
} satisfies Config;
