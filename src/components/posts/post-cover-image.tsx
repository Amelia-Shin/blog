"use client";

import { useState } from "react";
import Image from "next/image";

type PostCoverImageProps = {
  src: string;
  alt: string;
};

export function PostCoverImage({ src, alt }: PostCoverImageProps) {
  const [ratio, setRatio] = useState<number | null>(null);

  return (
    <div
      className="relative w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900"
      style={{ aspectRatio: ratio ?? 16 / 9 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform group-hover:scale-105"
        onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget;
          if (naturalWidth && naturalHeight) {
            setRatio(naturalWidth / naturalHeight);
          }
        }}
      />
    </div>
  );
}
