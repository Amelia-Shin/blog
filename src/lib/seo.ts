import type { Metadata } from "next";
import type { Post } from "@/types/post";
import { siteConfig } from "@/config/site";

export function buildDefaultMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    alternates: {
      types: { "application/rss+xml": `${siteConfig.url}/rss.xml` },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
  };
}

export function buildPostMetadata(post: Post): Metadata {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const images = post.cover ? [{ url: post.cover.url }] : undefined;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.cover ? [post.cover.url] : undefined,
    },
  };
}

type BlogPostingJsonLd = {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: { "@type": "Person"; name: string };
  image: string | undefined;
  url: string;
  mainEntityOfPage: string;
};

export function buildPostJsonLd(post: Post): BlogPostingJsonLd {
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.lastSyncedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    image: post.cover?.url,
    url,
    mainEntityOfPage: url,
  };
}
