"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
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
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isZoomed) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsZoomed(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed]);

  return (
    <figure className="my-4">
      <button
        type="button"
        onClick={() => setIsZoomed(true)}
        className="mx-auto block w-full cursor-zoom-in"
        style={{ maxWidth: maxWidth ? `${maxWidth}px` : undefined }}
        aria-label="이미지 확대"
      >
        <Image
          src={block.url}
          alt={altText}
          width={0}
          height={0}
          sizes="100vw"
          className={`h-auto w-full rounded-md ${maxWidth ? "" : "max-w-xl"}`}
          style={{ width: "100%", height: "auto" }}
          onLoad={(event) => {
            if (block.width) return;
            setNaturalWidth(event.currentTarget.naturalWidth);
          }}
        />
      </button>
      {block.caption.length > 0 && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          <RichTextRenderer items={block.caption} />
        </figcaption>
      )}

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/80 p-6"
          onClick={() => setIsZoomed(false)}
        >
          <button
            type="button"
            onClick={() => setIsZoomed(false)}
            aria-label="닫기"
            className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
          >
            <X className="h-5 w-5" />
          </button>
          <Image
            src={block.url}
            alt={altText}
            width={0}
            height={0}
            sizes="100vw"
            className="max-h-full max-w-full cursor-default rounded-md object-contain"
            style={{ width: "auto", height: "auto" }}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </figure>
  );
}
