import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { MediaAttachment } from "../media-types";

function storage(id: string) {
  const { R2_ACCOUNT_ID, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
  if (!R2_ACCOUNT_ID || !R2_BUCKET || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error("Media storage is not configured");
  }
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    forcePathStyle: true,
    requestChecksumCalculation: "WHEN_REQUIRED",
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });
  return { client, object: { Bucket: R2_BUCKET, Key: `family-contributions/${id}` } };
}

export function uploadUrl(id: string, attachment: MediaAttachment) {
  const { client, object } = storage(id);
  return getSignedUrl(client, new PutObjectCommand({
    ...object,
    ContentType: attachment.type,
    ContentLength: attachment.size,
    IfNoneMatch: "*",
  }), {
    expiresIn: 30 * 60,
    signableHeaders: new Set(["content-type", "content-length", "if-none-match"]),
  });
}

export async function matchesUpload(id: string, attachment: MediaAttachment) {
  const { client, object } = storage(id);
  try {
    const result = await client.send(new HeadObjectCommand(object), { abortSignal: AbortSignal.timeout(8000) });
    return result.ContentType === attachment.type && result.ContentLength === attachment.size;
  } catch (error) {
    if (error instanceof Error && (error.name === "NotFound" || error.name === "NoSuchKey")) return false;
    throw error;
  }
}

export function viewUrl(id: string) {
  const { client, object } = storage(id);
  return getSignedUrl(client, new GetObjectCommand(object), { expiresIn: 15 * 60 });
}
