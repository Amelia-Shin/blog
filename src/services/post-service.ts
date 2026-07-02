import { getPublishedPosts, getPostBySlug } from "@/lib/notion/queries";
import { renderBlocks } from "@/lib/notion/blocks";
import { mapPostSummary, mapPost, mapPostNavItem } from "@/lib/notion/mapper";
import { calculateReadingTimeMinutes } from "@/utils/reading-time";
import { siteConfig } from "@/config/site";
import type { Post, PostSummary, PostNavItem } from "@/types/post";

export async function getPostSummaries(): Promise<PostSummary[]> {
  const pages = await getPublishedPosts();

  return Promise.all(
    pages.map(async (page) => {
      const blocks = await renderBlocks(page.id);
      const readingTimeMinutes = calculateReadingTimeMinutes(blocks);
      return mapPostSummary(page, readingTimeMinutes);
    })
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const page = await getPostBySlug(slug);
  if (!page) return null;

  const blocks = await renderBlocks(page.id);
  const readingTimeMinutes = calculateReadingTimeMinutes(blocks);
  return mapPost(page, blocks, siteConfig.author, readingTimeMinutes);
}

export async function getAdjacentPosts(
  slug: string
): Promise<{ previous: PostNavItem | null; next: PostNavItem | null }> {
  const pages = await getPublishedPosts();
  const navItems = pages.map(mapPostNavItem);
  const index = navItems.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  // getPublishedPosts sorts by PublishedAt descending, so a higher index is older.
  return {
    previous: navItems[index + 1] ?? null,
    next: navItems[index - 1] ?? null,
  };
}
