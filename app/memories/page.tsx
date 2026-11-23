import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { listMemories, type PublishedMemory } from "../api/memory-storage";
import { hasReviewAccess } from "../api/review-access";

export default async function MemoriesPage() {
  const session = (await cookies()).get("memory-publishing-access")?.value;
  if (!hasReviewAccess(session)) redirect("/?signIn=memory-review");

  let memories: PublishedMemory[] | null = null;
  try {
    memories = await listMemories();
  } catch {
    // Show a storage error without exposing service credentials or details.
  }
  const photosByListing = new Map<string, PublishedMemory[]>();
  const listings: PublishedMemory[] = [];
  for (const memory of memories ?? []) {
    if (memory.parentId && memory.attachment?.type.startsWith("image/")) {
      const photos = photosByListing.get(memory.parentId) ?? [];
      photos.push(memory);
      photosByListing.set(memory.parentId, photos);
    } else if (!memory.parentId) {
      listings.push(memory);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f2ea] px-6 py-12 text-stone-950">
      <section className="mx-auto max-w-4xl">
        <nav className="mb-12 flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white/80 px-6 py-4 shadow-sm">
          <Link href="/home" className="text-lg font-bold">Vagotis Family Archive</Link>
          <Link href="/submit" className="rounded-full bg-amber-700 px-5 py-2 font-semibold text-white">
            Share a Memory
          </Link>
        </nav>
        <h1 className="text-5xl font-black tracking-tight">Family Contributions</h1>
        {memories === null && <p className="mt-6">Contributions are temporarily unavailable. Please try again later.</p>}
        {memories && listings.length === 0 && <p className="mt-6">Family contributions will appear here after they are published.</p>}
        <div className="mt-8 space-y-6">
          {listings.map((memory) => (
            <article id={memory.id} key={memory.id} className="scroll-mt-6 break-words rounded-3xl bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-bold text-amber-800">{memory.type}</p>
              <h2 className="mt-2 text-3xl font-black">{memory.title}</h2>
              <p className="mt-2 text-sm text-stone-600">Shared by {memory.name}</p>
              <p className="mt-5 whitespace-pre-wrap leading-7">{memory.memory}</p>
              {memory.attachment && (
                <div className="mt-5">
                  {memory.attachment.type.startsWith("video/") ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={memory.title}
                      src={`/api/memory-media/${memory.id}`}
                      className="max-h-[70vh] w-full rounded-2xl bg-black"
                    />
                  ) : (
                    // A private attachment is fetched directly by the signed-in browser.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/memory-media/${memory.id}`}
                      alt={memory.title}
                      loading="lazy"
                      className="max-h-[70vh] max-w-full rounded-2xl"
                    />
                  )}
                  <a
                    href={`/api/memory-media/${memory.id}`}
                    className="mt-2 inline-block text-sm font-semibold underline"
                  >
                    Open original attachment
                  </a>
                </div>
              )}
              {memory.relatedPeople && <p className="mt-4 text-sm text-stone-700">Related people: {memory.relatedPeople}</p>}
              {memory.photoNote && <p className="mt-2 text-sm text-stone-700">Photo or document note: {memory.photoNote}</p>}
              {photosByListing.has(memory.id) && (
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <h3 className="text-xl font-bold">More photos</h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {photosByListing.get(memory.id)?.map((photo) => (
                      <figure id={photo.id} key={photo.id} className="scroll-mt-6 rounded-2xl border border-stone-200 p-3">
                        <a href={`/api/memory-media/${photo.id}`} className="block">
                          {/* The signed-in browser requests this private photo directly. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/api/memory-media/${photo.id}`}
                            alt={photo.memory}
                            loading="lazy"
                            className="max-h-72 w-full rounded-xl bg-stone-100 object-contain"
                          />
                        </a>
                        <figcaption className="mt-2">
                          <p className="whitespace-pre-wrap">{photo.memory}</p>
                          {photo.relatedPeople && <p className="mt-1 text-sm text-stone-600">Related people: {photo.relatedPeople}</p>}
                          <p className="mt-1 text-sm text-stone-600">Shared by {photo.name}</p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
              <Link href={`/submit?listing=${memory.id}`} className="mt-5 inline-block rounded-full border border-stone-300 px-4 py-2 font-semibold hover:bg-stone-100">
                Add a photo<span className="sr-only"> to {memory.title}</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
