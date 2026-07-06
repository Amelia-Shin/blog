import type { NotionPage } from "@/types/notion";
import type { PostSummary, PostPreview, Post, PostNavItem, PostSyncStatus, Tag, Author } from "@/types/post";
import type { Block } from "@/types/block";

type PageProperty = NotionPage["properties"][string];

function getProperty(page: NotionPage, name: string): PageProperty | undefined {
  return page.properties[name];
}

function getTitleText(page: NotionPage, name: string): string {
  const property = getProperty(page, name);
  if (property?.type !== "title") return "";
  return property.title.map((item) => item.plain_text).join("");
}

function getPlainText(page: NotionPage, name: string): string {
  const property = getProperty(page, name);
  if (property?.type !== "rich_text") return "";
  return property.rich_text.map((item) => item.plain_text).join("");
}

function getDateStart(page: NotionPage, name: string): string | null {
  const property = getProperty(page, name);
  if (property?.type !== "date") return null;
  return property.date?.start ?? null;
}

function getTags(page: NotionPage, name: string): Tag[] {
  const property = getProperty(page, name);
  if (property?.type !== "multi_select") return [];
  return property.multi_select.map((option) => ({
    id: option.id,
    name: option.name,
    color: option.color,
  }));
}

function getCoverUrl(page: NotionPage, name: string): string | null {
  const property = getProperty(page, name);
  if (property?.type !== "files") return null;
  const file = property.files[0];
  if (!file) return null;
  // Notion-hosted files expire ~1h after being fetched; proxy through our own
  // route so the URL embedded in ISR-cached pages never itself goes stale.
  return file.type === "file"
    ? `/api/notion-image?id=${page.id}&kind=page-cover`
    : file.external.url;
}

export function mapPostSummary(
  page: NotionPage,
  readingTimeMinutes: number
): PostSummary {
  const coverUrl = getCoverUrl(page, "Cover");

  return {
    id: page.id,
    slug: getPlainText(page, "Slug"),
    title: getTitleText(page, "Title"),
    summary: getPlainText(page, "Summary"),
    cover: coverUrl ? { url: coverUrl } : null,
    tags: getTags(page, "Tags"),
    publishedAt: getDateStart(page, "PublishedAt") ?? page.created_time,
    readingTimeMinutes,
  };
}

export function mapPostPreview(page: NotionPage): PostPreview {
  const coverUrl = getCoverUrl(page, "Cover");

  return {
    id: page.id,
    slug: getPlainText(page, "Slug"),
    title: getTitleText(page, "Title"),
    summary: getPlainText(page, "Summary"),
    cover: coverUrl ? { url: coverUrl } : null,
    tags: getTags(page, "Tags"),
    publishedAt: getDateStart(page, "PublishedAt") ?? page.created_time,
  };
}

export function mapPostNavItem(page: NotionPage): PostNavItem {
  return {
    slug: getPlainText(page, "Slug"),
    title: getTitleText(page, "Title"),
  };
}

export function mapPostSyncStatus(page: NotionPage): PostSyncStatus {
  return {
    id: page.id,
    slug: getPlainText(page, "Slug"),
    lastEditedTime: page.last_edited_time,
    lastSyncedAt: getDateStart(page, "LastSyncedAt"),
  };
}

export function mapPost(
  page: NotionPage,
  blocks: Block[],
  author: Author,
  readingTimeMinutes: number
): Post {
  return {
    ...mapPostSummary(page, readingTimeMinutes),
    author,
    lastSyncedAt: getDateStart(page, "LastSyncedAt"),
    blocks,
  };
}
