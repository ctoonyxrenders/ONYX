import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { API_VERSION, DATASET, PROJECT_ID } from '@/constants/env'
// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId:PROJECT_ID, dataset:DATASET })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
