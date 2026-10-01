"use client";
import { blurDataURL } from "@/constants";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

export interface GalleryItem {
  url: string;
  fullUrl: string;
  width: number;
  height: number;
}

interface MasonryGalleryProps {
  images: GalleryItem[];
  alt?: string;
}

/**
 * Column-balanced masonry grid with a full-size lightbox.
 *
 * Uses native CSS multi-column layout: the browser balances column heights and
 * reflows on resize with no JS, no resize listener and no measurement state.
 * Each image keeps its intrinsic aspect ratio (`w-full h-auto` + real
 * width/height), so nothing is ever cropped or stretched, and the reserved
 * space prevents layout shift while images load.
 */
export default function MasonryGallery({ images, alt = "" }: MasonryGalleryProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const close = useCallback(() => setSelected(null), []);

  // Close on Escape and lock background scrolling while the lightbox is open.
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, close]);

  if (!images.length) return null;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-1">
        {images.map((image, index) => (
          <figure
            key={image.url}
            className="mb-1 break-inside-avoid overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setSelected(image)}
              aria-label="View image full size"
              className="block w-full cursor-zoom-in"
            >
              <Image
                src={image.url}
                alt={alt}
                width={image.width}
                height={image.height}
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="w-full h-auto transition-transform duration-500 ease-out hover:scale-[1.04]"
                priority={index < 3}
                unoptimized
              />
            </button>
          </figure>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cursor-zoom-out"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-5 text-3xl leading-none text-white/80 hover:text-white"
          >
            &times;
          </button>

          <Image
            src={selected.fullUrl}
            alt={alt}
            width={selected.width}
            height={selected.height}
            onClick={(event) => event.stopPropagation()}
            className="h-auto w-auto max-h-[90vh] max-w-full object-contain cursor-default"
            unoptimized
          />
        </div>
      )}
    </>
  );
}