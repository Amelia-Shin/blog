import { describe, expect, it } from "vitest";
import { mapPostSummary, mapPost, mapPostNavItem, mapPostSyncStatus } from "@/lib/notion/mapper";
import type { NotionPage } from "@/types/notion";
import type { Author } from "@/types/post";

function plainText(text: string) {
  return { plain_text: text, href: null, annotations: {} };
}

function buildPage(overrides: {
  id?: string;
  createdTime?: string;
  lastEditedTime?: string;
  title?: string;
  slug?: string;
  summary?: string;
  publishedAt?: string | null;
  lastSyncedAt?: string | null;
  tags?: { id: string; name: string; color: string }[];
  coverUrl?: string | null;
}): NotionPage {
  return {
    id: overrides.id ?? "page-1",
    created_time: overrides.createdTime ?? "2025-01-01T00:00:00.000Z",
    last_edited_time: overrides.lastEditedTime ?? "2025-01-02T00:00:00.000Z",
    properties: {
      Title: { type: "title", title: [plainText(overrides.title ?? "Untitled")] },
      Slug: { type: "rich_text", rich_text: [plainText(overrides.slug ?? "untitled")] },
      Summary: { type: "rich_text", rich_text: [plainText(overrides.summary ?? "")] },
      PublishedAt: {
        type: "date",
        date: overrides.publishedAt ? { start: overrides.publishedAt, end: null, time_zone: null } : null,
      },
      LastSyncedAt: {
        type: "date",
        date: overrides.lastSyncedAt ? { start: overrides.lastSyncedAt, end: null, time_zone: null } : null,
      },
      Tags: {
        type: "multi_select",
        multi_select: overrides.tags ?? [],
      },
      Cover: {
        type: "files",
        files: overrides.coverUrl
          ? [{ type: "external", name: "cover", external: { url: overrides.coverUrl } }]
          : [],
      },
    },
  } as unknown as NotionPage;
}

describe("mapPostSummary", () => {
  it("extracts fields from Notion properties", () => {
    const page = buildPage({
      title: "Hello World",
      slug: "hello-world",
      summary: "A summary",
      publishedAt: "2025-09-23",
      tags: [{ id: "t1", name: "SSR", color: "pink" }],
      coverUrl: "https://example.com/cover.png",
    });

    const summary = mapPostSummary(page, 5);

    expect(summary).toEqual({
      id: "page-1",
      slug: "hello-world",
      title: "Hello World",
      summary: "A summary",
      cover: { url: "https://example.com/cover.png" },
      tags: [{ id: "t1", name: "SSR", color: "pink" }],
      publishedAt: "2025-09-23",
      readingTimeMinutes: 5,
    });
  });

  it("falls back to created_time when PublishedAt is unset", () => {
    const page = buildPage({ createdTime: "2025-03-01T00:00:00.000Z", publishedAt: null });
    expect(mapPostSummary(page, 1).publishedAt).toBe("2025-03-01T00:00:00.000Z");
  });

  it("returns null cover when Cover property is empty", () => {
    const page = buildPage({ coverUrl: null });
    expect(mapPostSummary(page, 1).cover).toBeNull();
  });
});

describe("mapPost", () => {
  it("merges summary fields with author, lastSyncedAt, and blocks", () => {
    const page = buildPage({ lastSyncedAt: "2025-09-24T00:00:00.000Z" });
    const author: Author = { name: "Amelia" };

    const post = mapPost(page, [], author, 3);

    expect(post.author).toEqual(author);
    expect(post.lastSyncedAt).toBe("2025-09-24T00:00:00.000Z");
    expect(post.blocks).toEqual([]);
  });

  it("returns null lastSyncedAt when never synced", () => {
    const page = buildPage({ lastSyncedAt: null });
    const post = mapPost(page, [], { name: "Amelia" }, 1);
    expect(post.lastSyncedAt).toBeNull();
  });
});

describe("mapPostNavItem", () => {
  it("extracts only slug and title", () => {
    const page = buildPage({ title: "Next Post", slug: "next-post" });
    expect(mapPostNavItem(page)).toEqual({ slug: "next-post", title: "Next Post" });
  });
});

describe("mapPostSyncStatus", () => {
  it("extracts id, slug, lastEditedTime, and lastSyncedAt", () => {
    const page = buildPage({
      id: "page-2",
      slug: "my-post",
      lastEditedTime: "2025-10-01T00:00:00.000Z",
      lastSyncedAt: "2025-09-30T00:00:00.000Z",
    });

    expect(mapPostSyncStatus(page)).toEqual({
      id: "page-2",
      slug: "my-post",
      lastEditedTime: "2025-10-01T00:00:00.000Z",
      lastSyncedAt: "2025-09-30T00:00:00.000Z",
    });
  });
});
