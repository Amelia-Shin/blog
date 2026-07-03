import Link from "next/link";
import { TagBadge } from "@/components/blog/tag-badge";
import type { PostSummary, Tag } from "@/types/post";

type FeaturedTagsProps = {
  posts: PostSummary[];
};

export function FeaturedTags({ posts }: FeaturedTagsProps) {
  const counts = new Map<string, { tag: Tag; count: number }>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const entry = counts.get(tag.name);
      counts.set(tag.name, { tag, count: (entry?.count ?? 0) + 1 });
    }
  }

  const topTags = [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 8);

  return (
    <section className="flex flex-col gap-6 py-12">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">인기 태그</h2>
      {topTags.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">아직 태그가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {topTags.map(({ tag, count }) => (
            <Link key={tag.id} href={`/tags/${encodeURIComponent(tag.name)}`} className="inline-flex items-center gap-1.5">
              <TagBadge tag={tag} />
              <span className="text-xs text-zinc-400 dark:text-zinc-500">{count}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
