import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/contacts";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: base.origin,
  };
}
