import { NextResponse, type NextRequest } from "next/server";
import { getNotionClient } from "@/lib/notion/client";
import { getNotionErrorMessage } from "@/lib/notion/errors";

export const dynamic = "force-dynamic";

type ImageKind = "page-cover" | "block-image" | "block-video";

// Notion-hosted files ("file" type) are served from S3 presigned URLs that
// expire ~1 hour after Notion generates them. Baking those URLs directly into
// ISR-cached pages (revalidate = 3600) means a page served stale right after
// expiry shows broken images until the background revalidation catches up.
// This route re-resolves a fresh URL from Notion on every request and
// redirects to it, so the image src embedded in cached HTML never itself
// expires — only the redirect target does.
async function resolveUrl(kind: ImageKind, id: string): Promise<string | null> {
  const client = getNotionClient();

  if (kind === "page-cover") {
    const page = await client.pages.retrieve({ page_id: id });
    if (!("properties" in page)) return null;
    const property = page.properties["Cover"];
    if (property?.type !== "files") return null;
    const file = property.files[0];
    if (!file) return null;
    return file.type === "file" ? file.file.url : file.external.url;
  }

  const block = await client.blocks.retrieve({ block_id: id });
  if (!("type" in block)) return null;

  if (kind === "block-image" && block.type === "image") {
    return block.image.type === "file" ? block.image.file.url : block.image.external.url;
  }

  if (kind === "block-video" && block.type === "video") {
    return block.video.type === "file" ? block.video.file.url : block.video.external.url;
  }

  return null;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const id = request.nextUrl.searchParams.get("id");
  const kind = request.nextUrl.searchParams.get("kind") as ImageKind | null;

  if (!id || !kind) {
    return NextResponse.json({ error: "id, kind 파라미터가 필요합니다." }, { status: 400 });
  }

  try {
    const url = await resolveUrl(kind, id);
    if (!url) {
      return NextResponse.json({ error: "이미지를 찾을 수 없습니다." }, { status: 404 });
    }

    // next/image reads this route's response body directly (it does not
    // follow redirects for local image sources), so we fetch the signed URL
    // ourselves and stream the bytes back rather than redirecting to it.
    const upstream = await fetch(url);
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: "이미지를 불러오지 못했습니다." }, { status: 502 });
    }

    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
        // Signed URL lives ~1h; cache well under that so repeat views of the
        // same image skip this route (and Notion) entirely.
        "Cache-Control": "public, max-age=1800",
      },
    });
  } catch (error) {
    console.error("[api/notion-image]", error);
    return NextResponse.json({ error: getNotionErrorMessage(error) }, { status: 500 });
  }
}
