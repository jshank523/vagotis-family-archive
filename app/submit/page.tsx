import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { findMemory } from "../api/memory-storage";
import { hasReviewAccess } from "../api/review-access";
import MemoryForm from "./MemoryForm";

export default async function SubmitPage({
  searchParams,
}: {
  searchParams: Promise<{ listing?: string }>;
}) {
  const { listing } = await searchParams;
  if (!listing) return <MemoryForm />;

  const session = (await cookies()).get("memory-publishing-access")?.value;
  if (!hasReviewAccess(session)) redirect("/?signIn=memory-review");
  if (typeof listing !== "string" || !/^[a-f0-9-]{36}$/.test(listing)) notFound();

  const memory = await findMemory(listing);
  if (!memory || memory.parentId) notFound();
  return <MemoryForm key={memory.id} listing={{ id: memory.id, title: memory.title }} />;
}
