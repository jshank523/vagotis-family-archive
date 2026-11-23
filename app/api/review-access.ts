import { createHmac, timingSafeEqual } from "node:crypto";

export const reviewAccessSeconds = 60 * 60;

function sign(expiry: string, password: string) {
  return createHmac("sha256", password).update(`memory-review:${expiry}`).digest("hex");
}

export function createReviewAccess(password: string) {
  const expiry = String(Date.now() + reviewAccessSeconds * 1000);
  return `${expiry}.${sign(expiry, password)}`;
}

export function hasReviewAccess(token?: string) {
  const password = process.env.FAMILY_PASSWORD;
  if (!password || !token || !/^\d{13}\.[a-f0-9]{64}$/.test(token)) return false;

  const [expiry, signature] = token.split(".");
  return Number(expiry) > Date.now() &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(sign(expiry, password)));
}
