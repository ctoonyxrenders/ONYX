// lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PROJECT_ID, DATASET, API_VERSION } from "@/constants/env";

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  timeout: 30000, // ← ADD THIS (30 seconds instead of 10)
});

export async function getLogos() {
  try {
    const data = await client.fetch(
      `*[_type == "logos"]{
        images[]{
          asset->{
            url
          }
        }
      }`
    );

    return data.flatMap((entry: any) =>
      (entry.images || [])
        .filter((img: any) => img?.asset?.url)
        .map((img: any) => ({
          logo: img.asset.url,
        }))
    );
  } catch (error) {
    console.error('Failed to fetch logos:', error);
    return [];
  }
}

export async function getReviews() {
  try {
    return await client.fetch(
      `*[_type == "clientReview"]{
            name,
            designation,
            rating,
            img,
            logo,
            review,
          }`
    );
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
}

export async function getTeamMembers() {
  try {
    return await client.fetch(
      `*[_type == "teamMember"]{
              id,
              name,
              designation,
              image,
              alt
          }`
    );
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return [];
  }
}

// Optional: define types
interface GalleryImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

interface GalleryDoc {
  category: string;
  images: GalleryImage[];
}

export async function fetchGalleryData() {
  try {
    return await client.fetch(`*[_type == "gallery"]{
      category,
      images
    }`);
  } catch (error) {
    console.error('Failed to fetch gallery data:', error);
    return [];
  }
}

export async function fetchMapData() {
  const query = `
    *[_type == "mapData" && defined(countryStat)][0]{
      countryStat[]{
        countryName,
        value,
        countryCode
      }
    }
  `;

  try {
    const result = await client.fetch(query);
    return result?.countryStat || [];
  } catch (error) {
    console.error('Error fetching Sanity map data:', error);
    return [];
  }
}

export async function fetchFeedbackVideo() {
  try {
    return await client.fetch(
      `*[_type == "feedbackVideo"]{
        videoUrl
      }`
    );
  } catch (error) {
    console.error('Failed to fetch feedback video:', error);
    return [];
  }
}

const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

// ═══════════════════════════════════════════════════════════════
// Service pages — media only.
// All copy, FAQs and About text live in src/app/services/_content
// Uses the `client` and `urlFor()` defined above — no second client,
// no second image builder.
// ═══════════════════════════════════════════════════════════════

export interface SanityImageRef {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
}

export interface ImageItem {
  url: string;
  width: number;
  height: number;
}

/**
 * Sanity asset refs embed the source dimensions:
 *   image-<assetId>-<width>x<height>-<ext>
 * Reading them here means the frontend knows each image's natural
 * proportions before it loads — no extra request and no layout shift.
 * The masonry work grid depends on this to reserve column space correctly.
 */
const REF_DIMENSIONS = /-(\d+)x(\d+)-[a-z]+$/i;

function toImageItem(
  image: SanityImageRef | null | undefined,
  maxWidth = 1600
): ImageItem | null {
  const ref = image?.asset?._ref;
  if (!ref) return null;

  const dimensions = ref.match(REF_DIMENSIONS);
  if (!dimensions) return null;

  return {
    url: urlFor(image).width(maxWidth).auto('format').url(),
    width: Number(dimensions[1]),
    height: Number(dimensions[2]),
  };
}

function toImageItems(
  images: SanityImageRef[] | null | undefined,
  maxWidth = 1600
): ImageItem[] {
  return (images ?? [])
    .map((image) => toImageItem(image, maxWidth))
    .filter((item): item is ImageItem => item !== null);
}

export interface ServiceMedia {
  slider: ImageItem[];
  grid: ImageItem[];
  processVideo: string | null;
  processImages: ImageItem[];
}

const EMPTY_SERVICE_MEDIA: ServiceMedia = {
  slider: [],
  grid: [],
  processVideo: null,
  processImages: [],
};

/** Three masonry columns; nine images fills roughly three rows. */
export const SERVICE_GRID_LIMIT = 9;

/**
 * Media for one service page, matched on slug. Returns empty collections when
 * no document exists yet, so a service with no media still renders and every
 * section falls back to its placeholder rather than throwing.
 *
 * Copy never comes through here — it lives in src/app/services/_content.
 */
export async function fetchServiceMedia(slug: string): Promise<ServiceMedia> {
  try {
    const data = await client.fetch(
      `*[_type == "serviceMedia" && slug.current == $slug][0]{
        slider,
        grid,
        processVideo,
        processImages
      }`,
      { slug }
    );

    return {
      slider: toImageItems(data?.slider, 2000),
      grid: toImageItems(data?.grid, 1400).slice(0, SERVICE_GRID_LIMIT),
      processVideo: data?.processVideo ?? null,
      processImages: toImageItems(data?.processImages, 1200).slice(0, 4),
    };
  } catch (error) {
    console.error(`Error fetching serviceMedia for "${slug}":`, error);
    return EMPTY_SERVICE_MEDIA;
  }
}