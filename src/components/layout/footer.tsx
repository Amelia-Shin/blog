import { Container } from "@/components/common/container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 py-8 dark:border-zinc-800">
      <Container className="flex flex-col items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} blog. All rights reserved.</p>
      </Container>
    </footer>
  );
}
