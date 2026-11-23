import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { listMemories } from "./api/memory-storage";
import { hasReviewAccess } from "./api/review-access";

const categoryTypes = {
  stories: ["Story"],
  recipes: ["Recipe"],
  photos: ["Photo", "Video"],
  places: ["Place / Location"],
  documents: ["Document"],
  "family-tree": ["Family Tree Update"],
};

export default async function CategoryContributions({ category }: { category: keyof typeof categoryTypes }) {
  const session = (await cookies()).get("memory-publishing-access")?.value;
  if (!hasReviewAccess(session)) return null;

  const memories = await listMemories().catch(() => null);
  if (!memories) {
    return <p className="mt-10 text-sm text-stone-600">Family contributions are temporarily unavailable.</p>;
  }

  const types = categoryTypes[category];
  const listings = memories.filter((memory) => !memory.parentId && types.includes(memory.type));
  if (!listings.length) return null;

  const gallerySizes = new Map<string, number>();
  for (const memory of memories) {
    if (memory.parentId && memory.attachment?.type.startsWith("image/")) {
      gallerySizes.set(memory.parentId, (gallerySizes.get(memory.parentId) ?? 0) + 1);
    }
  }

  return (
    <section aria-labelledby="family-contributions-heading" className="mt-12 border-t border-stone-200 pt-8">
      <h2 id="family-contributions-heading" className="text-3xl font-black tracking-tight">Family contributions</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {listings.map((memory) => {
          const mediaUrl = `/api/memory-media/${memory.id}`;
          const gallerySize = gallerySizes.get(memory.id);
          return (
            <article key={memory.id} className="min-w-0 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-amber-800">Family contribution</p>
              <h3 className="mt-2 break-words text-2xl font-black">{memory.title}</h3>
              <p className="mt-1 text-sm text-stone-600">Shared by {memory.name}</p>
              <p className="mt-4 whitespace-pre-wrap break-words leading-7 text-stone-700">{memory.memory}</p>
              {memory.relatedPeople && (
                <p className="mt-3 text-sm text-stone-600">Related people: {memory.relatedPeople}</p>
              )}
              {memory.photoNote && (
                <p className="mt-2 text-sm text-stone-600">{memory.photoNote}</p>
              )}
              {memory.attachment?.type.startsWith("image/") && (
                <Image src={mediaUrl} alt={memory.title} width={640} height={360} unoptimized className="mt-4 max-h-72 w-full rounded-xl object-contain" />
              )}
              {memory.attachment?.type.startsWith("video/") && (
                <video controls playsInline preload="metadata" aria-label={memory.title} src={mediaUrl} className="mt-4 max-h-72 w-full rounded-xl bg-black" />
              )}
              <Link href={`/memories#${memory.id}`} className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">
                {gallerySize ? `View listing and ${gallerySize} more ${gallerySize === 1 ? "photo" : "photos"}` : "View contribution"}
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
