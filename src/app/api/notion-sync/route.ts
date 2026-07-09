import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { syncPublishedPosts } from "@/services/sync-service";

export const dynamic = "force-dynamic";

// This route triggers real Vercel deployments, so an unauthenticated public
// URL is a cost/abuse risk. Two auth paths are accepted:
// - Vercel Cron Jobs auto-send `Authorization: Bearer $CRON_SECRET` when a
//   CRON_SECRET env var is set on the project.
// - Manual/external calls can pass NOTION_SYNC_SECRET via query param or header.
// If neither env var is configured, the route stays open (unset = not enforced).
function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get("authorization") === `Bearer ${cronSecret}`) {
    return true;
  }

  const syncSecret = process.env.NOTION_SYNC_SECRET;
  if (syncSecret) {
    const provided = request.nextUrl.searchParams.get("secret") ?? request.headers.get("x-sync-secret");
    if (provided === syncSecret) return true;
  }

  return !cronSecret && !syncSecret;
}

async function handleSync(request: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncPublishedPosts();

    if (result.deployed) {
      revalidatePath("/blog");
      for (const slug of result.changedSlugs) {
        revalidatePath(`/blog/${slug}`);
      }
    }

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("[api/notion-sync] sync failed", error);
    const message = error instanceof Error ? error.message : "Sync failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return handleSync(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return handleSync(request);
}
