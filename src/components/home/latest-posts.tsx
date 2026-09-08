"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid, List } from "lucide-react";
import { PostCard } from "@/components/posts/post-card";
import { PostRow } from "@/components/posts/post-row";
import type { PostSummary } from "@/types/post";

type LatestPostsProps = {
  posts: PostSummary[];
};

type ViewMode = "grid" | "list";

export function LatestPosts({ posts }: LatestPostsProps) {
  const [view, setView] = useState<ViewMode>("grid");

  const latest = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  return (
    <section className="flex flex-col gap-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">최근 작성한 글</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-1 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="그리드 보기"
              aria-pressed={view === "grid"}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                view === "grid"
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="리스트 보기"
              aria-pressed={view === "list"}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                view === "list"
                  ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
              }`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            전체 보기
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      {latest.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">아직 발행된 글이 없습니다.</p>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {latest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {latest.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
