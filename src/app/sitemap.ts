import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Single-page site, so there is one entry. Section anchors are deliberately
 * omitted — search engines treat `#hash` fragments as the same URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
