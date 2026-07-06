import { getPublishedPosts, getPostBySlug } from "@/lib/notion/queries";
import { renderBlocks } from "@/lib/notion/blocks";
import { mapPostSummary, mapPost, mapPostNavItem, mapPostPreview } from "@/lib/notion/mapper";
import { calculateReadingTimeMinutes } from "@/utils/reading-time";
import { siteConfig } from "@/config/site";
import type { Post, PostSummary, PostNavItem, PostPreview } from "@/types/post";

const RELATED_POSTS_LIMIT = 3;

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

export async function getRelatedPosts(post: Post): Promise<PostPreview[]> {
  const pages = await getPublishedPosts();
  const currentTagNames = new Set(post.tags.map((tag) => tag.name));

  return pages
    .map(mapPostPreview)
    .filter((preview) => preview.slug !== post.slug)
    .map((preview) => ({
      preview,
      sharedTags: preview.tags.filter((tag) => currentTagNames.has(tag.name)).length,
    }))
    .filter((entry) => entry.sharedTags > 0)
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      return new Date(b.preview.publishedAt).getTime() - new Date(a.preview.publishedAt).getTime();
    })
    .slice(0, RELATED_POSTS_LIMIT)
    .map((entry) => entry.preview);
}
