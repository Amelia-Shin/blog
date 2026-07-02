import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/notion/queries";
import { mapPostNavItem } from "@/lib/notion/mapper";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPublishedPosts();

  const postEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${siteConfig.url}/blog/${mapPostNavItem(page).slug}`,
    lastModified: page.last_edited_time,
  }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    ...postEntries,
  ];
}
