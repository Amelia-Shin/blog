import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white transition-colors dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      {children}
    </div>
  );
}
