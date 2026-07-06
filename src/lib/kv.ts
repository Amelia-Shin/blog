import { kv } from "@vercel/kv";

function viewsKey(slug: string): string {
  return `post:views:${slug}`;
}

export async function incrementViews(slug: string): Promise<number> {
  return kv.incr(viewsKey(slug));
}

export async function getViews(slug: string): Promise<number> {
  return (await kv.get<number>(viewsKey(slug))) ?? 0;
}

export async function getViewsMany(slugs: string[]): Promise<Record<string, number>> {
  if (slugs.length === 0) return {};

  const counts = await kv.mget<number[]>(...slugs.map(viewsKey));
  return Object.fromEntries(slugs.map((slug, i) => [slug, counts[i] ?? 0]));
}
