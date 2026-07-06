import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card } from "@/components/common/card";
import { TagBadge } from "@/components/blog/tag-badge";
import { formatDate } from "@/utils/date";
import type { PostPreview } from "@/types/post";

type RelatedPostsProps = {
  posts: PostPreview[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">관련 글</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.slug}`}>
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
              <div className="flex flex-col gap-2 p-4">
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 self-start">
                    {post.tags.slice(0, 2).map((tag) => (
                      <TagBadge key={tag.id} tag={tag} />
                    ))}
                  </div>
                )}
                <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
