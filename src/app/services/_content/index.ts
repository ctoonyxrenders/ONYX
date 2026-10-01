// src/app/services/_content/index.ts
//
// The service registry — the ONLY place a new service is wired up.
//
// Valid routes come from navigation.ts, not from this file. A slug listed in
// the nav but absent here renders the Coming Soon banner, so no nav link ever
// 404s while its content is still being written.
//
// To ship a service:
//   1. copy exterior-3d-renderings.ts, rewrite the copy, set `slug` to match
//      the href already in navigation.ts
//   2. import it here and add it to SERVICE_CONTENT
//   3. create a Sanity "Service Page Media" document with the same slug
// No component is touched at any point.

import type { ServiceContent } from "../_types";
import exterior3dRenderings from "./exterior-3d-renderings";

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  [exterior3dRenderings.slug]: exterior3dRenderings,
};

export function getServiceContent(slug: string): ServiceContent | null {
  return SERVICE_CONTENT[slug] ?? null;
}