import { MessageCircle } from "lucide-react";

export function CommentPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-zinc-200 py-12 text-center text-sm text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
      <MessageCircle className="h-5 w-5" />
      댓글 기능은 준비 중입니다.
    </div>
  );
}
