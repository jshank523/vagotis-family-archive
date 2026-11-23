import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { readMediaAttachment, type MediaAttachment } from "../media-types";

const contributionTypes = ["Story", "Recipe", "Photo", "Video", "Document", "Family Tree Update", "Place / Location", "Correction"];
const limits = { name: 120, type: 30, title: 160, memory: 8000, relatedPeople: 300, photoNote: 500 };
export type Draft = Record<keyof typeof limits, string> & { attachment?: MediaAttachment; parentId?: string };

export function readDraft(value: unknown): Draft | null {
  if (!value || typeof value !== "object") return null;
  const draft = {} as Draft;
  for (const field of Object.keys(limits) as (keyof typeof limits)[]) {
    const text = (value as Record<string, unknown>)[field];
    if (typeof text !== "string" || text.length > limits[field]) return null;
    draft[field] = text.trim();
  }
  if (!draft.name || !draft.title || !draft.memory || !contributionTypes.includes(draft.type)) return null;
  const media = (value as Record<string, unknown>).attachment;
  if (media !== undefined) {
    const attachment = readMediaAttachment(media);
    if (!attachment) return null;
    draft.attachment = attachment;
  }
  if (draft.type === "Video" && !draft.attachment?.type.startsWith("video/")) return null;
  const parentId = (value as Record<string, unknown>).parentId;
  if (parentId !== undefined) {
    if (typeof parentId !== "string" || !/^[a-f0-9-]{36}$/.test(parentId) ||
        draft.type !== "Photo" || !draft.attachment?.type.startsWith("image/")) return null;
    draft.parentId = parentId;
  }
  return draft;
}

function signature(draft: Draft, id: string, time: string, key: string) {
  return createHmac("sha256", key).update(JSON.stringify(["memory-approval", id, time, draft])).digest("hex");
}

export function approveDraft(draft: Draft, key: string) {
  const id = randomUUID();
  const time = String(Date.now());
  return { id, token: [id, time, signature(draft, id, time, key)].join(".") };
}

export function readApproval(draft: Draft, approval: unknown, key: string) {
  if (typeof approval !== "string" || !/^[a-f0-9-]{36}\.\d{13}\.[a-f0-9]{64}$/.test(approval)) return null;
  const [id, time, signed] = approval.split(".");
  const age = Date.now() - Number(time);
  if (age < 0 || age > 30 * 60 * 1000 ||
      !timingSafeEqual(Buffer.from(signed), Buffer.from(signature(draft, id, time, key)))) return null;
  return id;
}
