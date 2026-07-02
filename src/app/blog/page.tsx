import type { Metadata } from "next";
import { getPostSummaries } from "@/services/post-service";
import { PostList } from "@/components/blog/post-list";
import { siteConfig } from "@/config/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: siteConfig.description,
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default async function BlogPage() {
  const posts = await getPostSummaries();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </main>
  );
}
