import type { HeadingBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

const TAG_BY_TYPE = {
  heading_1: "h2",
  heading_2: "h3",
  heading_3: "h4",
} as const;

const CLASS_BY_TYPE = {
  heading_1: "text-2xl font-bold",
  heading_2: "text-xl font-bold",
  heading_3: "text-lg font-semibold",
} as const;

// Offset by one so the post title (h1) remains the page's only h1.
export function HeadingBlockComponent({ block }: { block: HeadingBlock }) {
  const Tag = TAG_BY_TYPE[block.type];

  return (
    <Tag id={block.id} className={`scroll-mt-24 mt-8 ${CLASS_BY_TYPE[block.type]}`}>
      <RichTextRenderer items={block.richText} />
    </Tag>
  );
}
