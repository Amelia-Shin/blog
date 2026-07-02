import type { Block, RichText } from "@/types/block";

const CHARS_PER_MINUTE = 500;

function richTextToPlain(items: RichText[]): string {
  return items.map((item) => item.text).join("");
}

function blockToText(block: Block): string {
  switch (block.type) {
    case "paragraph":
    case "heading_1":
    case "heading_2":
    case "heading_3":
    case "quote":
    case "callout":
    case "code":
      return richTextToPlain(block.richText);
    case "bulleted_list_item":
    case "numbered_list_item":
    case "toggle":
      return `${richTextToPlain(block.richText)} ${collectPlainText(block.children)}`;
    case "bookmark":
    case "image":
      return richTextToPlain(block.caption);
    case "divider":
    case "table_of_contents":
      return "";
  }
}

function collectPlainText(blocks: Block[]): string {
  return blocks.map(blockToText).join(" ");
}

// Korean text isn't reliably word-delimited, so reading time is estimated by
// character count rather than word count.
export function calculateReadingTimeMinutes(blocks: Block[]): number {
  const charCount = collectPlainText(blocks).replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(charCount / CHARS_PER_MINUTE));
}
