const featuredStats = [
  ["3+", "Generations"],
  ["∞", "Memories to preserve"],
  ["1", "Shared legacy"],
];

const sections = [
  ["Family Tree", "See how everyone is connected across generations.", "/family-tree", "🌳"],
  ["Stories", "Read memories, milestones, and family history.", "/stories", "📖"],
  ["Recipes", "Preserve favorite meals and holiday traditions.", "/recipes", "🍝"],
  ["Photos", "Browse albums from reunions, weddings, and everyday life.", "/photos", "📷"],
  ["Places", "Explore where our family has lived and traveled.", "/places", "🌍"],
  ["Documents", "Letters, records, clippings, certificates, and more.", "/documents", "📜"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-stone-950">
      <section className="relative overflow-hidden px-6 py-8">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-stone-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <nav className="mb-10 flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-6 py-4 shadow-sm backdrop-blur">
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

            <a
              href="/submit"
              className="rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800"
            >
              Contribute
            </a>
          </nav>

          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-3 shadow-2xl backdrop-blur">
            <div className="flex h-[340px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-stone-900 md:h-[400px]">
              <img
  src="/images/vagotis-hero.jpg"
  alt="Vagotis family archive hero"
  className="h-full w-full object-cover"
/>
            </div>
          </div>

          <div className="mt-14 max-w-5xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-amber-700">
              The Vagotis Family Archive
            </p>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              A living record of the Vagotis family.
            </h1>

            <p className="mt-7 max-w-3xl text-xl leading-9 text-stone-700">
              Explore family trees, stories, recipes, photos, documents, and
              places that connect generations of the Vagotis family.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/family-tree"
                className="rounded-2xl bg-stone-950 px-7 py-4 font-semibold text-white shadow-lg hover:bg-stone-700"
              >
                Explore Family Tree →
              </a>

              <a
                href="/documents"
                className="rounded-2xl border border-stone-300 bg-white/70 px-7 py-4 font-semibold shadow-sm hover:bg-white"
              >
                View Documents
              </a>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {featuredStats.map(([number, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur"
                >
                  <p className="text-5xl font-black text-amber-700">
                    {number}
                  </p>
                  <p className="mt-2 font-semibold text-stone-700">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-700">
          Explore the archive
        </p>

        <h2 className="mt-3 text-4xl font-black tracking-tight">
          Discover our family story
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map(([title, desc, href, icon]) => (
            <a
              key={title}
              href={href}
              className="group rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                {icon}
              </div>

              <h3 className="text-2xl font-bold">{title}</h3>

              <p className="mt-3 leading-7 text-stone-600">{desc}</p>

              <p className="mt-6 font-semibold text-amber-700 group-hover:text-stone-950">
                Open section →
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] bg-stone-950 p-10 text-white shadow-2xl md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
            Family contributions
          </p>

          <div className="mt-4 grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Help preserve the memories before they fade.
            </h2>

            <div>
              <p className="leading-8 text-stone-300">
                Add a story, recipe, photo, document, or place connected to the
                Vagotis family history.
              </p>

              <a
                href="/submit"
                className="mt-6 inline-block rounded-2xl bg-amber-400 px-7 py-4 font-bold text-stone-950 hover:bg-amber-300"
              >
                Share a Memory
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/70 px-6 py-8 text-center text-sm text-stone-500">
        Built for the Vagotis Family — preserving generations of stories,
        memories, and legacy.
      </footer>
    </main>
  );
}