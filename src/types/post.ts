import type { Block } from "@/types/block";

export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Cover = {
  url: string;
  blurDataUrl?: string;
};

export type Author = {
  name: string;
  avatarUrl?: string;
};

export type PostStatus = "Published" | "Draft";

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  cover: Cover | null;
  tags: Tag[];
  publishedAt: string;
  readingTimeMinutes: number;
};

export type Post = PostSummary & {
  author: Author;
  lastSyncedAt: string | null;
  blocks: Block[];
};

export type PostNavItem = {
  slug: string;
  title: string;
};

export type PostSyncStatus = {
  id: string;
  slug: string;
  lastEditedTime: string;
  lastSyncedAt: string | null;
};
