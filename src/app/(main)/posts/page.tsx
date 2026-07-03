import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { PostsExplorer } from "@/components/posts/posts-explorer";
import { getPostSummaries } from "@/services/post-service";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Posts",
  description: siteConfig.description,
  alternates: { canonical: `${siteConfig.url}/posts` },
};

export default async function PostsPage() {
  const posts = await getPostSummaries();

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Posts</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">전체 {posts.length}개의 글</p>

      <div className="mt-8">
        <PostsExplorer posts={posts} />
      </div>

      <nav className="mt-12 flex items-center justify-center gap-2">
        <Link
          href="/posts"
          className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-400 dark:border-zinc-800"
        >
          이전
        </Link>
        <span className="rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-50 dark:text-zinc-900">
          1
        </span>
        <Link
          href="/posts"
          className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-400 dark:border-zinc-800"
        >
          다음
        </Link>
      </nav>
    </Container>
  );
}
