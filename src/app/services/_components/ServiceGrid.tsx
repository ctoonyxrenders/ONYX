// src/app/services/_components/ServiceGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { blurDataURL } from "@/constants";
import type { ImageItem } from "@/lib/sanity";

/**
 * Work preview grid — same masonry behaviour as the Gallery page: native CSS
 * multi-column, browser-balanced, no JS and no resize listener. Each image
 * keeps its intrinsic ratio via real width/height, so nothing is cropped and
 * the reserved space prevents layout shift.
 *
 * Capped at nine upstream (SERVICE_GRID_LIMIT) — roughly three rows across
 * three columns. CSS columns have no true row concept, so the cap is on count.
 *
 * Unlike the Gallery there is no lightbox: clicking through to /gallery is the
 * intended path.
 */
export default function ServiceGrid({
  images,
  viewMoreLabel,
}: {
  images: ImageItem[];
  viewMoreLabel: string;
}) {
  if (!images.length) return null;

  return (
    <section className="section">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
        {images.map((image) => (
          <figure
            key={image.url}
            className="mb-3 break-inside-avoid overflow-hidden"
          >
            <Image
              src={image.url}
              alt=""
              width={image.width}
              height={image.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </figure>
        ))}
      </div>

      <div className="flex justify-center mt-10 md:mt-16">
        <Link href="/gallery">
          <button className="btn-pill border border-[#114046] text-[#114046] hover:bg-[#114046] hover:text-white">
            {viewMoreLabel}
          </button>
        </Link>
      </div>
    </section>
  );
}