import { cache } from "react";
import { isFullPage, isFullBlock } from "@notionhq/client";
import { getNotionClient, getDataSourceId } from "@/lib/notion/client";
import { handleNotionError } from "@/lib/notion/errors";
import type { NotionPage, NotionBlock } from "@/types/notion";
import type { PostStatus } from "@/types/post";

const PUBLISHED: PostStatus = "Published";

// Wrapped in React's cache() so repeated calls within the same request/render
// pass (e.g. generateMetadata + the page component both calling getPost)
// dedupe into a single Notion API call instead of refetching.
export const getPublishedPosts = cache(async (): Promise<NotionPage[]> => {
  try {
    const client = getNotionClient();
    const dataSourceId = await getDataSourceId();

    const response = await client.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Status",
        status: { equals: PUBLISHED },
      },
      sorts: [{ property: "PublishedAt", direction: "descending" }],
    });

    return response.results.filter(isFullPage);
  } catch (error) {
    return handleNotionError("getPublishedPosts", error);
  }
});

export const getPostBySlug = cache(async (slug: string): Promise<NotionPage | null> => {
  try {
    const client = getNotionClient();
    const dataSourceId = await getDataSourceId();

    const response = await client.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "Status", status: { equals: PUBLISHED } },
        ],
      },
      page_size: 1,
    });

    const page = response.results.find(isFullPage);
    return page ?? null;
  } catch (error) {
    return handleNotionError("getPostBySlug", error);
  }
});

export const getBlocks = cache(async (blockId: string): Promise<NotionBlock[]> => {
  try {
    const client = getNotionClient();
    const blocks: NotionBlock[] = [];
    let cursor: string | undefined;

    do {
      const response = await client.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
        page_size: 100,
      });

      blocks.push(...response.results.filter(isFullBlock));
      cursor = response.next_cursor ?? undefined;
    } while (cursor);

    return blocks;
  } catch (error) {
    return handleNotionError("getBlocks", error);
  }
});

// Not wrapped in cache() — this is a write, and each call must reach Notion.
export async function updatePageLastSyncedAt(pageId: string, timestamp: string): Promise<void> {
  try {
    const client = getNotionClient();
    await client.pages.update({
      page_id: pageId,
      properties: {
        LastSyncedAt: { date: { start: timestamp } },
      },
    });
  } catch (error) {
    handleNotionError("updatePageLastSyncedAt", error);
  }
}
