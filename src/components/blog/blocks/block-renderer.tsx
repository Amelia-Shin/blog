import type { Block, BulletedListItemBlock, NumberedListItemBlock } from "@/types/block";
import { ParagraphBlockComponent } from "@/components/blog/blocks/paragraph-block";
import { HeadingBlockComponent } from "@/components/blog/blocks/heading-block";
import { ListBlockComponent } from "@/components/blog/blocks/list-block";
import { QuoteBlockComponent } from "@/components/blog/blocks/quote-block";
import { DividerBlockComponent } from "@/components/blog/blocks/divider-block";
import { CodeBlockComponent } from "@/components/blog/blocks/code-block";
import { ImageBlockComponent } from "@/components/blog/blocks/image-block";
import { VideoBlockComponent } from "@/components/blog/blocks/video-block";
import { CalloutBlockComponent } from "@/components/blog/blocks/callout-block";
import { BookmarkBlockComponent } from "@/components/blog/blocks/bookmark-block";
import { TocBlockComponent } from "@/components/blog/blocks/toc-block";
import { ToggleBlockComponent } from "@/components/blog/blocks/toggle-block";

type ListGroup = {
  type: "bulleted_list_item" | "numbered_list_item";
  items: (BulletedListItemBlock | NumberedListItemBlock)[];
};

function isListGroup(entry: Block | ListGroup): entry is ListGroup {
  return "items" in entry;
}

// Notion returns consecutive list items as sibling blocks; group them so
// bulleted/numbered runs render as a single <ul>/<ol> instead of one per item.
function groupBlocks(blocks: Block[]): (Block | ListGroup)[] {
  const grouped: (Block | ListGroup)[] = [];

  for (const block of blocks) {
    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const last = grouped[grouped.length - 1];
      if (last && isListGroup(last) && last.type === block.type) {
        last.items.push(block);
        continue;
      }
      grouped.push({ type: block.type, items: [block] });
      continue;
    }
    grouped.push(block);
  }

  return grouped;
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  const grouped = groupBlocks(blocks);

  return (
    <>
      {grouped.map((entry) =>
        isListGroup(entry) ? (
          <ListBlockComponent key={entry.items[0].id} type={entry.type} items={entry.items} />
        ) : (
          <BlockEntry key={entry.id} block={entry} allBlocks={blocks} />
        )
      )}
    </>
  );
}

function BlockEntry({ block, allBlocks }: { block: Block; allBlocks: Block[] }) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlockComponent block={block} />;
    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <HeadingBlockComponent block={block} />;
    case "quote":
      return <QuoteBlockComponent block={block} />;
    case "divider":
      return <DividerBlockComponent />;
    case "code":
      return <CodeBlockComponent block={block} />;
    case "image":
      return <ImageBlockComponent block={block} />;
    case "video":
      return <VideoBlockComponent block={block} />;
    case "callout":
      return <CalloutBlockComponent block={block} />;
    case "bookmark":
      return <BookmarkBlockComponent block={block} />;
    case "table_of_contents":
      return <TocBlockComponent allBlocks={allBlocks} />;
    case "toggle":
      return <ToggleBlockComponent block={block} />;
    case "bulleted_list_item":
    case "numbered_list_item":
      return null;
  }
}
