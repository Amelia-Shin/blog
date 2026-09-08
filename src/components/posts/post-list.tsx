import { PostRow } from "@/components/posts/post-row";
import type { PostSummary } from "@/types/post";

type PostListProps = {
  posts: PostSummary[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="py-12 text-sm text-zinc-500 dark:text-zinc-400">아직 발행된 글이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostRow key={post.id} post={post} />
      ))}
    </div>
  );
}
