"use client";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchGalleryData, urlFor } from "@/lib/sanity";
import Banner from "./Banner";
import Menu from "./Menu";
import MasonryGallery, { GalleryItem } from "./MasonryGallery";

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

const ALL = "All";

/** Must match the labels rendered by <Menu /> and the Header dropdown. */
const CATEGORY_LABELS = [
  "Interior",
  "Exterior",
  "3D Modelling",
  "3D Floor Plan",
  "Product Modeling",
] as const;

/** Sanity asset refs embed dimensions: image-<id>-<width>x<height>-<ext> */
const REF_DIMENSIONS = /-(\d+)x(\d+)-[a-z]+$/i;

const normalize = (value: string) => value.replace(/\s+/g, "").toLowerCase();

/**
 * Builds the CDN urls once and recovers the intrinsic dimensions from the asset
 * ref, so the masonry can reserve the correct space before the image loads.
 * The grid loads a lighter 1600px render; the lightbox loads 2400px.
 */
function toGalleryItem(image: GalleryImage): GalleryItem | null {
  const ref = image?.asset?._ref;
  if (!ref) return null;

  const dimensions = ref.match(REF_DIMENSIONS);
  if (!dimensions) return null;

  const source = urlFor(image).auto("format");

  return {
    url: source.width(1600).url(),
    fullUrl: source.width(2400).url(),
    width: Number(dimensions[1]),
    height: Number(dimensions[2]),
  };
}

export default function Page() {
  const [data, setData] = useState<GalleryDoc[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = searchParams.get("category");
  const [currentMenu, setCurrentMenu] = useState<string>(category || ALL);

  useEffect(() => {
    let active = true;
    fetchGalleryData().then((fetchedData: GalleryDoc[]) => {
      if (active) setData(fetchedData);
    });
    return () => {
      active = false;
    };
  }, []);

  // Keep the active menu in sync when the URL changes (navbar dropdown,
  // back/forward button, direct link). The component does not remount on a
  // client-side navigation, so without this the grid would stay stale.
  useEffect(() => {
    setCurrentMenu(category || ALL);
  }, [category]);

  // Clicking a pill in <Menu /> updates the URL too, so the URL stays the
  // single source of truth and the dropdown always triggers a real change.
  const handleMenuChange = (menu: string) => {
    setCurrentMenu(menu);
    router.replace(
      menu === ALL ? pathname : `${pathname}?category=${encodeURIComponent(menu)}`,
      { scroll: false }
    );
  };

  // urlFor() runs exactly once per image, only when the fetched data changes.
  // Switching categories is then a plain lookup rather than a full re-map.
  const galleries = useMemo(() => {
    const grouped: Record<string, GalleryItem[]> = { [ALL]: [] };
    CATEGORY_LABELS.forEach((label) => {
      grouped[label] = [];
    });

    data.forEach((doc) => {
      const items = (doc.images ?? [])
        .map(toGalleryItem)
        .filter((item): item is GalleryItem => item !== null);

      if (!items.length) return;

      grouped[ALL].push(...items);

      const label = CATEGORY_LABELS.find(
        (candidate) => normalize(candidate) === normalize(doc.category ?? "")
      );
      if (label) grouped[label].push(...items);
    });

    return grouped;
  }, [data]);

  const currentData = galleries[currentMenu] ?? [];

  return (
    <>
      <Banner />
      <Menu setCurrentMenu={handleMenuChange} currentMenu={currentMenu} />
      <div className="px-1 my-5">
        <MasonryGallery images={currentData} alt={currentMenu} />
      </div>
    </>
  );
}