import Link from "next/link";
import { Container } from "@/components/common/container";
import { Navigation } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Blog
        </Link>
        <div className="flex items-center gap-2">
          <Navigation />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
