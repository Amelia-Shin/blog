import Image from "next/image";

type PostCoverImageProps = {
  src: string;
  alt: string;
};

export function PostCoverImage({ src, alt }: PostCoverImageProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform group-hover:scale-105"
      />
    </div>
  );
}
