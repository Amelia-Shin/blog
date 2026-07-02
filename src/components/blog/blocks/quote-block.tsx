import type { QuoteBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

export function QuoteBlockComponent({ block }: { block: QuoteBlock }) {
  return (
    <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-700 dark:text-gray-400">
      <RichTextRenderer items={block.richText} />
    </blockquote>
  );
}
