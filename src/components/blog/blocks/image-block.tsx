"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

export function ImageBlockComponent({ block }: { block: ImageBlock }) {
  const altText = block.caption.map((item) => item.text).join("") || "Post image";
  // Notion's API doesn't expose the display width/ratio the author set in the
  // editor, so by default we cap the rendered width at the image's own pixel
  // width — this avoids upscaling a small image to fill the article column.
  // An explicit `{w:N}` caption tag (see lib/notion/blocks.ts) always wins.
  const [naturalWidth, setNaturalWidth] = useState<number | null>(null);
  const maxWidth = block.width ?? naturalWidth;

  return (
    <figure className="my-4">
      <Image
        src={block.url}
        alt={altText}
        width={0}
        height={0}
        sizes="100vw"
        className={`mx-auto h-auto w-full rounded-md ${maxWidth ? "" : "max-w-xl"}`}
        style={{ width: "100%", height: "auto", maxWidth: maxWidth ? `${maxWidth}px` : undefined }}
        onLoad={(event) => {
          if (block.width) return;
          setNaturalWidth(event.currentTarget.naturalWidth);
        }}
      />
      {block.caption.length > 0 && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          <RichTextRenderer items={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}
