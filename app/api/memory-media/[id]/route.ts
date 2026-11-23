import { NextRequest, NextResponse } from "next/server";
import { viewUrl } from "../../media-storage";
import { findMemory } from "../../memory-storage";
import { hasReviewAccess } from "../../review-access";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!hasReviewAccess(request.cookies.get("memory-publishing-access")?.value)) {
    return new NextResponse(null, { status: 401 });
  }
  const { id } = await params;
  if (!/^[a-f0-9-]{36}$/.test(id)) return new NextResponse(null, { status: 404 });
  try {
    const memory = await findMemory(id);
    if (!memory?.attachment) return new NextResponse(null, { status: 404 });
    if (memory.parentId) {
      const parent = await findMemory(memory.parentId);
      if (!parent || parent.parentId) return new NextResponse(null, { status: 404 });
    }
    return NextResponse.redirect(await viewUrl(id), { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
