import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import type { PostSummary } from "@/types/post";
import { TagBadge } from "@/components/blog/tag-badge";
import { formatDate } from "@/utils/date";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 transition hover:shadow-md dark:border-gray-800"
    >
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
        {post.cover && (
          <Image
            src={post.cover.url}
            alt={post.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="space-y-2 p-4">
        {post.tags[0] && <TagBadge tag={post.tags[0]} />}
        <h3 className="line-clamp-2 text-lg font-semibold">{post.title}</h3>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readingTimeMinutes}분
          </span>
        </div>
      </div>
    </Link>
  );
}
