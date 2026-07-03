import Image from "next/image";
import type { ImageBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

export function ImageBlockComponent({ block }: { block: ImageBlock }) {
  const altText = block.caption.map((item) => item.text).join("") || "Post image";

  return (
    <figure className="my-4">
      <Image
        src={block.url}
        alt={altText}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full rounded-md"
        style={{ width: "100%", height: "auto" }}
      />
      {block.caption.length > 0 && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          <RichTextRenderer items={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}
