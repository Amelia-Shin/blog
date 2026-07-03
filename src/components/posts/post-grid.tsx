import { PostCard } from "@/components/posts/post-card";
import type { PostSummary } from "@/types/post";

type PostGridProps = {
  posts: PostSummary[];
};

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return <p className="py-12 text-sm text-zinc-500 dark:text-zinc-400">아직 발행된 글이 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
