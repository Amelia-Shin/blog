import { cn } from "@/lib/cn";

type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return <hr className={cn("border-zinc-200 dark:border-zinc-800", className)} />;
}
