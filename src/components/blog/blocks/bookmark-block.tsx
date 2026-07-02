import type { BookmarkBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

export function BookmarkBlockComponent({ block }: { block: BookmarkBlock }) {
  return (
    <a
      href={block.url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-4 block rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
    >
      <div className="text-sm font-medium">{block.url}</div>
      {block.caption.length > 0 && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <RichTextRenderer items={block.caption} />
        </div>
      )}
    </a>
  );
}
