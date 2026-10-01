import { createClient } from 'next-sanity'

import { API_VERSION, DATASET, PROJECT_ID } from '@/constants/env'

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
