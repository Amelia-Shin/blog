import { notFound } from "next/navigation";
import { getPost, getAdjacentPosts } from "@/services/post-service";
import { PostHeader } from "@/components/blog/post-header";
import { PostNavigation } from "@/components/blog/post-navigation";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { BlockRenderer } from "@/components/blog/blocks/block-renderer";
import { getPublishedPosts } from "@/lib/notion/queries";
import { mapPostNavItem } from "@/lib/notion/mapper";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getPublishedPosts();
  return pages.map((page) => ({ slug: mapPostNavItem(page).slug })).filter((p) => p.slug);
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, adjacent] = await Promise.all([getPost(slug), getAdjacentPosts(slug)]);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-[1fr_240px]">
      <article className="min-w-0">
        <PostHeader post={post} />
        <div className="mt-8">
          <BlockRenderer blocks={post.blocks} />
        </div>
        <PostNavigation previous={adjacent.previous} next={adjacent.next} />
      </article>
      <TableOfContents blocks={post.blocks} />
    </main>
  );
}
