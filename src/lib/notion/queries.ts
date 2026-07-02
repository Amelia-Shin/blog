import { isFullPage, isFullBlock } from "@notionhq/client";
import { getNotionClient, getDataSourceId } from "@/lib/notion/client";
import type { NotionPage, NotionBlock } from "@/types/notion";

export async function getPublishedPosts(): Promise<NotionPage[]> {
  const client = getNotionClient();
  const dataSourceId = await getDataSourceId();

  const response = await client.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Status",
      status: { equals: "Published" },
    },
    sorts: [{ property: "PublishedAt", direction: "descending" }],
  });

  return response.results.filter(isFullPage);
}

export async function getPostBySlug(slug: string): Promise<NotionPage | null> {
  const client = getNotionClient();
  const dataSourceId = await getDataSourceId();

  const response = await client.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: slug } },
        { property: "Status", status: { equals: "Published" } },
      ],
    },
    page_size: 1,
  });

  const page = response.results.find(isFullPage);
  return page ?? null;
}

export async function getBlocks(blockId: string): Promise<NotionBlock[]> {
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
}
