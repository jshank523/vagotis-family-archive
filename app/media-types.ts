const mediaTypes = {
  "image/jpeg": 20,
  "image/png": 20,
  "image/webp": 20,
  "image/gif": 20,
  "video/mp4": 100,
  "video/webm": 100,
  "video/quicktime": 100,
};

export const acceptMedia = Object.keys(mediaTypes).join(",");
export const acceptPhotos = Object.keys(mediaTypes).filter((type) => type.startsWith("image/")).join(",");

export type MediaAttachment = { type: keyof typeof mediaTypes; size: number };

export function readMediaAttachment(value: unknown): MediaAttachment | null {
  if (!value || typeof value !== "object") return null;
  const { type, size } = value as { type?: unknown; size?: unknown };
  if (typeof type !== "string" || !Object.hasOwn(mediaTypes, type) ||
      typeof size !== "number" || !Number.isSafeInteger(size) || size <= 0) return null;
  const mediaType = type as MediaAttachment["type"];
  return size <= mediaTypes[mediaType] * 1024 * 1024 ? { type: mediaType, size } : null;
}
