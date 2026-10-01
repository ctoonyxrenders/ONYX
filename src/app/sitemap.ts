import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://onyxrenders.com";

  const pages = [
    "",
    "portfolio",
    "studio",
    "careers",
    "academy",
    "portfolio/gallery",
  ];

  return pages.map((page) => ({
    url: `${siteUrl}/${page}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: page === "" ? 1.0 : 0.8,
  }));
}
