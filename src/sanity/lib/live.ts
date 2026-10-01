// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import { defineLive } from 'next-sanity'
import { client } from './client'
import { API_VERSION } from '../../constants/env'

export const { sanityFetch, SanityLive } = defineLive({
  client: (client.withConfig({
    apiVersion: API_VERSION, // Make sure this is your correct API version
  }) as any), // ✅ Cast to any to bypass the type conflict
})
