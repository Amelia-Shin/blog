import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { syncPublishedPosts } from "@/services/sync-service";

export const dynamic = "force-dynamic";

// NOTION_SYNC_SECRET is optional but strongly recommended: this route triggers
// real Vercel deployments, so an unauthenticated public URL is a cost/abuse risk.
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.NOTION_SYNC_SECRET;
  if (!secret) return true;

  const provided = request.nextUrl.searchParams.get("secret") ?? request.headers.get("x-sync-secret");
  return provided === secret;
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
