import type { Draft } from "./memory-draft";

const key = "vagotis:archive:published-memories";
export type PublishedMemory = Draft & { id: string; publishedAt: string };

async function redis(command: (string | number)[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Archive storage is not configured");

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Archive storage request failed");
  const result = await response.json();
  if (result.error) throw new Error("Archive storage command failed");
  return result.result;
}

export async function publishMemory(memory: PublishedMemory) {
  const result = await redis(["HSETNX", key, memory.id, JSON.stringify(memory)]);
  if (result !== 0 && result !== 1) throw new Error("Unexpected archive storage response");
}

export async function listMemories(): Promise<PublishedMemory[]> {
  const entries: string[] = await redis(["HVALS", key]);
  return entries.map((entry) => JSON.parse(entry) as PublishedMemory)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function findMemory(id: string): Promise<PublishedMemory | null> {
  const entry: string | null = await redis(["HGET", key, id]);
  return entry ? JSON.parse(entry) as PublishedMemory : null;
}
