import type { VideoBlock } from "@/types/block";
import { RichTextRenderer } from "@/components/blog/blocks/rich-text";

function getYouTubeEmbedUrl(url: string): string | null {
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) return url;

  return null;
}

function getVimeoEmbedUrl(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : null;
}

function getEmbedUrl(url: string): string | null {
  return getYouTubeEmbedUrl(url) ?? getVimeoEmbedUrl(url);
}

export function VideoBlockComponent({ block }: { block: VideoBlock }) {
  const embedUrl = block.source === "external" ? getEmbedUrl(block.url) : null;

  return (
    <figure className="my-4">
      {block.source === "file" ? (
        <video controls src={block.url} className="w-full rounded-md" />
      ) : embedUrl ? (
        <div className="relative aspect-video overflow-hidden rounded-md">
          <iframe
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : (
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md border border-gray-200 p-4 text-sm underline underline-offset-2 dark:border-gray-800"
        >
          {block.url}
        </a>
      )}
      {block.caption.length > 0 && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          <RichTextRenderer items={block.caption} />
        </figcaption>
      )}
    </figure>
  );
}
