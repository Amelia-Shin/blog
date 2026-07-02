import type { PostSummary } from "@/types/post";
import { PostCard } from "@/components/blog/post-card";

export function PostList({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">아직 게시된 글이 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
