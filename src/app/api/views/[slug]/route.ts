import { NextResponse, type NextRequest } from "next/server";
import { incrementViews, getViews } from "@/lib/kv";

export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ slug: string }> };

export async function POST(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { slug } = await params;

  try {
    const views = await incrementViews(slug);
    return NextResponse.json({ views });
  } catch (error) {
    console.error("[api/views] increment failed", error);
    return NextResponse.json({ views: 0 });
  }
}

export async function GET(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { slug } = await params;

  try {
    const views = await getViews(slug);
    return NextResponse.json({ views });
  } catch (error) {
    console.error("[api/views] get failed", error);
    return NextResponse.json({ views: 0 });
  }
}
