import { getPublishedPosts } from "@/lib/notion/queries";
import { renderBlocks } from "@/lib/notion/blocks";
import { mapPostSummary } from "@/lib/notion/mapper";
import { calculateReadingTimeMinutes } from "@/utils/reading-time";
import type { PostSummary } from "@/types/post";

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
