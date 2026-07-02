import type { ToggleBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";
import { BlockRenderer } from "@/components/blog/blocks/block-renderer";

export function ToggleBlockComponent({ block }: { block: ToggleBlock }) {
  return (
    <details className="my-4 rounded-md border border-gray-200 p-3 dark:border-gray-800">
      <summary className="cursor-pointer font-medium">
        <RichTextRenderer items={block.richText} />
      </summary>
      {block.children.length > 0 && (
        <div className="mt-2 pl-4">
          <BlockRenderer blocks={block.children} />
        </div>
      )}
    </details>
  );
}
