"use client";

import { useEffect } from "react";

type ErrorFallbackProps = {
  error: Error & { digest?: string };
  onRetry: () => void;
};

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-24 text-center">
      <h2 className="text-xl font-semibold">문제가 발생했습니다</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">{error.message}</p>
      <button
        onClick={onRetry}
        className="mt-6 rounded-md border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
      >
        다시 시도
      </button>
    </main>
  );
}
