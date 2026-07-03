import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getAdjacentPosts } from "@/services/post-service";
import { PostHeader } from "@/components/blog/post-header";
import { PostNavigation } from "@/components/blog/post-navigation";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { BlockRenderer } from "@/components/blog/blocks/block-renderer";
import { ShareButton } from "@/components/posts/share-button";
import { CommentPlaceholder } from "@/components/posts/comment-placeholder";
import { getPublishedPosts } from "@/lib/notion/queries";
import { mapPostNavItem } from "@/lib/notion/mapper";
import { buildPostMetadata, buildPostJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getPublishedPosts();
  return pages.map((page) => ({ slug: mapPostNavItem(page).slug })).filter((p) => p.slug);
}

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return post ? buildPostMetadata(post, "/posts") : {};
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, adjacent] = await Promise.all([getPost(slug), getAdjacentPosts(slug)]);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1fr_240px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPostJsonLd(post, "/posts")) }}
      />
      <article className="min-w-0">
        <PostHeader post={post} />
        <div className="mt-4">
          <ShareButton title={post.title} />
        </div>
        <div className="mt-8">
          <BlockRenderer blocks={post.blocks} />
        </div>
        <PostNavigation previous={adjacent.previous} next={adjacent.next} basePath="/posts" />
        <div className="mt-12">
          <CommentPlaceholder />
        </div>
      </article>
      <TableOfContents blocks={post.blocks} />
    </div>
  );
}
