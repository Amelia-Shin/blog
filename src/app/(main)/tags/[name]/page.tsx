import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { PostGrid } from "@/components/posts/post-grid";
import { getPostSummaries } from "@/services/post-service";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

type TagPageProps = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { name } = await params;
  const tagName = decodeURIComponent(name);
  return {
    title: `#${tagName}`,
    description: siteConfig.description,
    alternates: { canonical: `${siteConfig.url}/tags/${encodeURIComponent(tagName)}` },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { name } = await params;
  const tagName = decodeURIComponent(name);

  const posts = await getPostSummaries();
  const filtered = posts.filter((post) => post.tags.some((tag) => tag.name === tagName));

  if (filtered.length === 0) {
    notFound();
  }

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">#{tagName}</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{filtered.length}개의 글</p>

      <div className="mt-8">
        <PostGrid posts={filtered} />
      </div>
    </Container>
  );
}
