import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/contacts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: new URL("/", base).toString(), lastModified: new Date("2026-07-16"), changeFrequency: "monthly", priority: 1 },
  ];
}
