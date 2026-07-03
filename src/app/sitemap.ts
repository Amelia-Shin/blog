import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/notion/queries";
import { mapPostSummary } from "@/lib/notion/mapper";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPublishedPosts();
  const posts = pages.map((page) => mapPostSummary(page, 0));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const tagNames = [...new Set(posts.flatMap((post) => post.tags.map((tag) => tag.name)))];
  const tagEntries: MetadataRoute.Sitemap = tagNames.map((name) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(name)}`,
  }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/posts`, lastModified: new Date() },
    { url: `${siteConfig.url}/tags`, lastModified: new Date() },
    { url: `${siteConfig.url}/about`, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    ...postEntries,
    ...blogPostEntries,
    ...tagEntries,
  ];
}
