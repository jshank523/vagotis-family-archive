import { NextRequest, NextResponse } from "next/server";
import { readApproval, readDraft } from "../memory-draft";
import { findMemory, publishMemory } from "../memory-storage";
import { hasReviewAccess } from "../review-access";
import { matchesUpload } from "../media-storage";

export async function POST(request: NextRequest) {
  if (!hasReviewAccess(request.cookies.get("memory-publishing-access")?.value)) {
    return NextResponse.json({ error: "Unlock the family archive again before publishing." }, { status: 401 });
  }

  const raw = await request.text();
  if (raw.length > 60000) return NextResponse.json({ error: "This draft is too long." }, { status: 413 });

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "The draft could not be read." }, { status: 400 });
  }

  const draft = readDraft(payload?.draft);
  const key = process.env.OPENAI_API_KEY;
  const id = draft && key && readApproval(draft, payload?.approval, key);
  if (!draft || !id) {
    return NextResponse.json({ error: "Review this version of the draft again before publishing." }, { status: 409 });
  }

  try {
    if (draft.parentId) {
      const parent = await findMemory(draft.parentId);
      if (!parent || parent.parentId) return NextResponse.json({ error: "This listing is no longer available." }, { status: 404 });
    }
    if (draft.attachment && !(await matchesUpload(id, draft.attachment))) {
      return NextResponse.json({ error: "The attachment upload could not be verified. Try publishing again." }, { status: 422 });
    }
    await publishMemory({ ...draft, id, publishedAt: new Date().toISOString() });
    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "The archive could not confirm publication. Your draft is still here. Try publishing again." }, { status: 503 });
  }
}
