import Image from "next/image";
import type { CalloutBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

export function CalloutBlockComponent({ block }: { block: CalloutBlock }) {
  const isIconUrl = block.icon?.startsWith("http");

  return (
    <div className="my-4 flex gap-3 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
      {block.icon && (
        <span aria-hidden className="relative h-5 w-5 shrink-0">
          {isIconUrl ? (
            <Image src={block.icon} alt="" fill className="object-contain" />
          ) : (
            block.icon
          )}
        </span>
      )}
      <div>
        <RichTextRenderer items={block.richText} />
      </div>
    </div>
  );
}
