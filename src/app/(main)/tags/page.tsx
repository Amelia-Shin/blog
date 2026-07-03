import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { TagBadge } from "@/components/blog/tag-badge";
import { getPostSummaries } from "@/services/post-service";
import { siteConfig } from "@/config/site";
import type { Tag } from "@/types/post";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tags",
  description: siteConfig.description,
  alternates: { canonical: `${siteConfig.url}/tags` },
};

export default async function TagsPage() {
  const posts = await getPostSummaries();

  const counts = new Map<string, { tag: Tag; count: number }>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const entry = counts.get(tag.name);
      counts.set(tag.name, { tag, count: (entry?.count ?? 0) + 1 });
    }
  }

  const allTags = [...counts.values()].sort((a, b) => b.count - a.count);

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Tags</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">전체 {allTags.length}개의 태그</p>

      {allTags.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">아직 태그가 없습니다.</p>
      ) : (
        <div className="mt-8 flex flex-wrap gap-3">
          {allTags.map(({ tag, count }) => (
            <Link
              key={tag.id}
              href={`/tags/${encodeURIComponent(tag.name)}`}
              className="inline-flex items-center gap-1.5"
            >
              <TagBadge tag={tag} />
              <span className="text-xs text-zinc-400 dark:text-zinc-500">{count}</span>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
