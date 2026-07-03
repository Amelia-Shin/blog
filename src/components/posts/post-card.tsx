import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/common/card";
import { TagBadge } from "@/components/blog/tag-badge";
import { formatDate } from "@/utils/date";
import type { PostSummary } from "@/types/post";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="group h-full overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700">
        <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-900">
          {post.cover && (
            <Image
              src={post.cover.url}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col gap-3 p-5">
          {post.tags[0] && <TagBadge tag={post.tags[0]} />}
          <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{post.summary}</p>
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
