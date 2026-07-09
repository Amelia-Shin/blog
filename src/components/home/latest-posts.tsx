import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/posts/post-card";
import type { PostSummary } from "@/types/post";

type LatestPostsProps = {
  posts: PostSummary[];
};

export function LatestPosts({ posts }: LatestPostsProps) {
  const latest = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  return (
    <section className="flex flex-col gap-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">최근 작성한 글</h2>
        <Link
          href="/posts"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          전체 보기
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      {latest.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">아직 발행된 글이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {latest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
