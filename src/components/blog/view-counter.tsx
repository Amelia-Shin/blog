"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type ViewCounterProps = {
  slug: string;
};

export function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data: { views: number }) => {
        if (!cancelled) setViews(data.views);
      })
      .catch(() => {
        if (!cancelled) setViews(0);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
      <Eye className="h-3.5 w-3.5" />
      {views === null ? "조회수 불러오는 중" : `조회 ${views.toLocaleString()}회`}
    </span>
  );
}
