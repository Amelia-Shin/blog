import type { RichTextItemResponse } from "@notionhq/client";
import { getBlocks } from "@/lib/notion/queries";
import type { NotionBlock } from "@/types/notion";
import type { Block, RichText } from "@/types/block";

type CalloutIcon = Extract<NotionBlock, { type: "callout" }>["callout"]["icon"];

function toRichText(items: RichTextItemResponse[]): RichText[] {
  return items.map((item) => ({
    text: item.plain_text,
    href: item.href,
    annotations: item.annotations,
  }));
}

function getIcon(icon: CalloutIcon): string | null {
  if (!icon) return null;
  if (icon.type === "emoji") return icon.emoji;
  if (icon.type === "external") return icon.external.url;
  if (icon.type === "file") return icon.file.url;
  return null;
}

async function mapChildren(blockId: string): Promise<Block[]> {
  const children = await getBlocks(blockId);
  const mapped = await Promise.all(children.map(mapBlock));
  return mapped.filter((block): block is Block => block !== null);
}

async function mapBlock(block: NotionBlock): Promise<Block | null> {
  switch (block.type) {
    case "paragraph":
      return {
        id: block.id,
        type: "paragraph",
        richText: toRichText(block.paragraph.rich_text),
      };
    case "heading_1":
      return {
        id: block.id,
        type: "heading_1",
        richText: toRichText(block.heading_1.rich_text),
      };
    case "heading_2":
      return {
        id: block.id,
        type: "heading_2",
        richText: toRichText(block.heading_2.rich_text),
      };
    case "heading_3":
      return {
        id: block.id,
        type: "heading_3",
        richText: toRichText(block.heading_3.rich_text),
      };
    case "bulleted_list_item":
      return {
        id: block.id,
        type: "bulleted_list_item",
        richText: toRichText(block.bulleted_list_item.rich_text),
        children: block.has_children ? await mapChildren(block.id) : [],
      };
    case "numbered_list_item":
      return {
        id: block.id,
        type: "numbered_list_item",
        richText: toRichText(block.numbered_list_item.rich_text),
        children: block.has_children ? await mapChildren(block.id) : [],
      };
    case "quote":
      return {
        id: block.id,
        type: "quote",
        richText: toRichText(block.quote.rich_text),
      };
    case "divider":
      return { id: block.id, type: "divider" };
    case "code":
      return {
        id: block.id,
        type: "code",
        richText: toRichText(block.code.rich_text),
        language: block.code.language,
      };
    case "image":
      return {
        id: block.id,
        type: "image",
        url: block.image.type === "external" ? block.image.external.url : block.image.file.url,
        caption: toRichText(block.image.caption),
      };
    case "video":
      return {
        id: block.id,
        type: "video",
        url: block.video.type === "external" ? block.video.external.url : block.video.file.url,
        source: block.video.type,
        caption: toRichText(block.video.caption),
      };
    case "callout":
      return {
        id: block.id,
        type: "callout",
        richText: toRichText(block.callout.rich_text),
        icon: getIcon(block.callout.icon),
      };
    case "bookmark":
      return {
        id: block.id,
        type: "bookmark",
        url: block.bookmark.url,
        caption: toRichText(block.bookmark.caption),
      };
    case "table_of_contents":
      return { id: block.id, type: "table_of_contents" };
    case "toggle":
      return {
        id: block.id,
        type: "toggle",
        richText: toRichText(block.toggle.rich_text),
        children: block.has_children ? await mapChildren(block.id) : [],
      };
    default:
      return null;
  }
}

export async function renderBlocks(pageId: string): Promise<Block[]> {
  return mapChildren(pageId);
}
