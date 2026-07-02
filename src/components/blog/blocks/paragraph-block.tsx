import type { ParagraphBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

export function ParagraphBlockComponent({ block }: { block: ParagraphBlock }) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-4">
      <RichTextRenderer items={block.richText} />
    </p>
  );
}
