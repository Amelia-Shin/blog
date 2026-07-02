import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/types/post";
import { TagBadge } from "@/components/blog/tag-badge";
import { formatDate } from "@/utils/date";

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="space-y-4">
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
      )}
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {formatDate(post.publishedAt)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {post.readingTimeMinutes}분
        </span>
      </div>
    </header>
  );
}
