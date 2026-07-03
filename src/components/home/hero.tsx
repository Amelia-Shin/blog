import { Button } from "@/components/common/button";

export function Hero() {
  return (
    <section className="flex flex-col gap-6 py-20 sm:py-28">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">안녕하세요 👋</p>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        기록하고, 정리하고, 공유하는
        <br />
        블로그
        {/* 프론트엔드 개발자의 기술 블로그 */}
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
        경험 중심으로 배운 것을 정리합니다.
        {/* 웹 프론트엔드를 중심으로 배운 것을 정리합니다. React, Next.js, TypeScript 이야기를 주로 */}
        {/* 다루며, 실무에서 겪은 문제와 해결 과정을 남깁니다. */}
      </p>
      <div className="flex gap-3">
        <Button href="/posts">글 둘러보기</Button>
        <Button href="/about" variant="secondary">
          소개 보기
        </Button>
      </div>
    </section>
  );
}
