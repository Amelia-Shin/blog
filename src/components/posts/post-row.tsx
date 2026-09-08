import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/common/card";
import { TagBadge } from "@/components/blog/tag-badge";
import { formatDate } from "@/utils/date";
import type { PostSummary } from "@/types/post";

type PostRowProps = {
  post: PostSummary;
};

export function PostRow({ post }: PostRowProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="group flex gap-4 overflow-hidden p-4 hover:border-zinc-300 dark:hover:border-zinc-700">
        <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md bg-zinc-100 sm:w-40 dark:bg-zinc-900">
          {post.cover && (
            <Image
              src={post.cover.url}
              alt={post.title}
              fill
              sizes="160px"
              className="object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-2">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}
          <h3 className="line-clamp-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h3>
          <p className="line-clamp-1 text-sm text-zinc-500 dark:text-zinc-400">{post.summary}</p>
          <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTimeMinutes}분
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
