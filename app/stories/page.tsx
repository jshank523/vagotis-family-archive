const stories = [
  {
    id: 1,
    title: "A Family Memory",
    person: "Related person",
    year: "Year ____",
    location: "Location ____",
    category: "Memory",
    excerpt:
      "Write a short preview of the story here. This could be a memory, milestone, family tradition, or important moment.",
  },
  {
    id: 2,
    title: "How We Got Here",
    person: "Related person",
    year: "Year ____",
    location: "Location ____",
    category: "History",
    excerpt:
      "Use this space for migration stories, childhood memories, holidays, or stories passed down through generations.",
  },
  {
    id: 3,
    title: "A Favorite Tradition",
    person: "Related person",
    year: "Year ____",
    location: "Location ____",
    category: "Tradition",
    excerpt:
      "Add family traditions, funny stories, meaningful moments, or memories from relatives.",
  },
];

export default function StoriesPage() {
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
          Family Stories
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Stories & Memories
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-700">
              Preserve the moments, traditions, journeys, jokes, and memories
              that make our family history feel alive.
            </p>
          </div>

          <div className="rounded-[2rem] bg-stone-950 p-7 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Memory archive
            </p>
            <p className="mt-3 leading-7 text-stone-300">
              Add stories from grandparents, parents, cousins, holidays,
              reunions, childhood memories, and family milestones.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur">
          <input
            type="text"
            placeholder="Search stories by person, place, or year..."
            className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none focus:border-amber-500 md:flex-1"
          />

          <a
            href="/submit"
            className="rounded-2xl bg-stone-950 px-7 py-4 font-semibold text-white shadow hover:bg-stone-700"
          >
            Share a Story
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.id}
              className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-40 items-center justify-center bg-stone-900 text-5xl">
                📖
              </div>

              <div className="p-7">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                  {story.category}
                </p>

                <h2 className="mt-4 text-2xl font-black">{story.title}</h2>

                <p className="mt-3 text-sm font-medium text-stone-500">
                  {story.year} • {story.location}
                </p>

                <p className="mt-2 text-sm text-stone-500">
                  Connected to: {story.person}
                </p>

                <p className="mt-5 leading-7 text-stone-700">
                  {story.excerpt}
                </p>

                <button className="mt-7 rounded-2xl border border-stone-300 px-5 py-3 text-sm font-semibold transition group-hover:border-stone-950 group-hover:bg-stone-950 group-hover:text-white">
                  Read Story →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}