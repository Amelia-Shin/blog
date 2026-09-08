"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { PostGrid } from "@/components/posts/post-grid";
import { PostList } from "@/components/posts/post-list";
import { cn } from "@/lib/cn";
import type { PostSummary } from "@/types/post";

type SortOrder = "latest" | "oldest";
type ViewMode = "grid" | "list";

type PostsExplorerProps = {
  posts: PostSummary[];
};

export function PostsExplorer({ posts }: PostsExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [view, setView] = useState<ViewMode>("grid");

  const tags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.tags.map((tag) => tag.name)))],
    [posts],
  );

  const visiblePosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = posts.filter((post) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.summary.toLowerCase().includes(normalizedQuery);
      const matchesTag = !activeTag || post.tags.some((tag) => tag.name === activeTag);
      return matchesQuery && matchesTag;
    });

    return filtered.sort((a, b) => {
      const diff = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      return sortOrder === "latest" ? -diff : diff;
    });
  }, [posts, query, activeTag, sortOrder]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색어를 입력하세요"
            className="w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:ring-zinc-700"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeTag === null
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50",
            )}
          >
            전체
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                activeTag === tag
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{visiblePosts.length}개의 글</p>

        <div className="flex items-center gap-2">
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>

          <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-1 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="그리드 보기"
              aria-pressed={view === "grid"}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                view === "grid"
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50",
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="리스트 보기"
              aria-pressed={view === "list"}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                view === "list"
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50",
              )}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {view === "grid" ? <PostGrid posts={visiblePosts} /> : <PostList posts={visiblePosts} />}
      </div>
    </div>
  );
}
