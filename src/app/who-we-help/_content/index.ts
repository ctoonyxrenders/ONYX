// src/app/who-we-help/_content/index.ts
//
// The audience registry — the ONLY place a new Who We Help page is wired up.
//
// Valid routes come from navigation.ts, not from this file. A slug listed in
// the nav but absent here renders the Coming Soon banner, so no nav link ever
// 404s while its content is still being written.

import type { WhoWeHelpContent } from "../_types";
import developers from "./developers";
import architects from "./architects";
import interiorDesigners from "./interior-designers";
import homeowners from "./homeowners";
import students from "./students";

export const WHO_WE_HELP_CONTENT: Record<string, WhoWeHelpContent> = {
  [developers.slug]: developers,
  [architects.slug]: architects,
  [interiorDesigners.slug]: interiorDesigners,
  [homeowners.slug]: homeowners,
  [students.slug]: students,
};

export function getWhoWeHelpContent(slug: string): WhoWeHelpContent | null {
  return WHO_WE_HELP_CONTENT[slug] ?? null;
}
