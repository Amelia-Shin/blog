import Link from "next/link";
import type { PostNavItem } from "@/types/post";

export function PostNavigation({
  previous,
  next,
}: {
  previous: PostNavItem | null;
  next: PostNavItem | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-12 grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 sm:grid-cols-2 dark:border-gray-800">
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400">이전 글</div>
          <div className="mt-1 font-medium">{previous.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="rounded-md border border-gray-200 p-4 text-right hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400">다음 글</div>
          <div className="mt-1 font-medium">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
