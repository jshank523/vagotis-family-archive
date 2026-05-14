"use client";

import { useState } from "react";

const photos = [
  {
    id: 1,
    title: "Luke & Nina Wedding Album",
    category: "Wedding Album",
    year: "Family Celebration",
    event: "Wedding",
    people: "Luke, Nina, Family",
    coverImage: "/photos/Taryn Baxter Photographer_Nina+Luke_Wedding-0513.JPG",
    description:
      "A full album capturing Luke and Nina’s wedding celebration.",
    images: [
  "/photos/luke-nina-wedding.jpg",
  "/photos/IMG_3361.jpeg",
  "/photos/IMG_9325.jpeg",
],
  },
];

export default function PhotosPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);

  return (
    <main className="min-h-screen bg-[#f7f2ea] px-6 py-12 text-stone-950">
      <section className="mx-auto max-w-7xl">
        <nav className="mb-12 flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-6 py-4 shadow-sm backdrop-blur">
          <a href="/" className="text-lg font-bold">
            Vagotis Family Archive
          </a>

          <div className="hidden gap-6 text-sm font-medium text-stone-700 md:flex">
              <a href="/family-tree" className="hover:text-stone-950">Tree</a>
              <a href="/stories" className="hover:text-stone-950">Stories</a>
              <a href="/recipes" className="hover:text-stone-950">Recipes</a>
              <a href="/photos" className="hover:text-stone-950">Photos</a>
              <a href="/places" className="hover:text-stone-950">Places</a>
              <a href="/documents" className="hover:text-stone-950">Documents</a>
            </div>

        </nav>

        <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-700">
          Family Photos
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Photo Albums & Memories
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-700">
              Preserve the moments that shaped our family—reunions, weddings,
              holidays, milestones, and everyday memories across generations.
            </p>
          </div>

          <div className="rounded-[2rem] bg-stone-950 p-7 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Visual archive
            </p>
            <p className="mt-3 leading-7 text-stone-300">
              Upload old family photos, scanned albums, reunions, holidays,
              weddings, and the everyday moments worth remembering.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur">
          <input
            type="text"
            placeholder="Search photos by person, event, or year..."
            className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none focus:border-amber-500 md:flex-1"
          />

          <a
            href="/submit"
            className="rounded-2xl bg-stone-950 px-7 py-4 font-semibold text-white shadow hover:bg-stone-700"
          >
            Upload Photos
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <article
              key={photo.id}
              className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-stone-100">
  <img
    src={photo.coverImage}
    alt={photo.title}
    className="h-full w-full object-cover"
  />
</div>

              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                  {photo.category}
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  {photo.title}
                </h2>

                <p className="mt-3 text-sm font-medium text-stone-500">
                  {photo.year} • {photo.event}
                </p>

                <p className="mt-2 text-sm text-stone-500">
                  People: {photo.people}
                </p>

                <button
  onClick={() => setSelectedAlbum(photo)}
  className="mt-6 rounded-2xl border border-stone-300 px-5 py-3 text-sm font-semibold transition group-hover:border-stone-950 group-hover:bg-stone-950 group-hover:text-white"
>
  View Album →
</button>
              </div>
            </article>
          ))}
        </div>
      </section>
      {selectedAlbum && (
  <div className="fixed inset-0 z-[999] overflow-y-auto bg-stone-950/70 p-6 backdrop-blur-sm">
    <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-6 shadow-2xl">
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
            {selectedAlbum.category}
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {selectedAlbum.title}
          </h2>
          <p className="mt-2 text-stone-600">
            {selectedAlbum.description}
          </p>
        </div>

        <button
          onClick={() => setSelectedAlbum(null)}
          className="rounded-full bg-stone-100 px-4 py-2 text-xl font-bold hover:bg-stone-200"
        >
          ×
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {selectedAlbum.images.map((image: string) => (
          <img
            key={image}
            src={image}
            alt={selectedAlbum.title}
            className="w-full rounded-2xl object-cover shadow-sm"
          />
        ))}
      </div>
    </div>
  </div>
)}
    </main>
  );
}