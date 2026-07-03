import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { SearchBar } from "@/components/posts/search-bar";
import { PostGrid } from "@/components/posts/post-grid";
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

  const tags = [...new Set(posts.flatMap((post) => post.tags.map((tag) => tag.name)))];

  return (
    <Container size="lg" className="py-12">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Posts</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">전체 {posts.length}개의 글</p>

      <div className="mt-8 flex flex-col gap-4">
        <SearchBar />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-900">
              전체
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50"
              >
                {tag}
              </button>
            ))}
          </div>

          <select
            defaultValue="latest"
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <PostGrid posts={posts} />
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
