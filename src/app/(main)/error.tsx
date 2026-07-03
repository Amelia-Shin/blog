"use client";

import { ErrorFallback } from "@/components/ui/error-fallback";

export default function MainError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return <ErrorFallback error={error} onRetry={unstable_retry} />;
}
