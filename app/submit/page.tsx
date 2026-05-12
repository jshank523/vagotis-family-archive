"use client";

import { useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPAww-76RXu_wTXaSsUQygQ-ebS273dxed8IuT4JgONnwptahWOMg7QseuKvbRaVaEjg/exec";

export default function SubmitPage() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      type: formData.get("type"),
      title: formData.get("title"),
      memory: formData.get("memory"),
      relatedPeople: formData.get("relatedPeople"),
      photoNote: formData.get("photoNote"),
    };

    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    });

    setStatus("Thank you — your memory was submitted.");
    form.reset();
  }

  return (
    <main className="min-h-screen bg-[#f7f2ea] px-6 py-12 text-stone-950">
      <section className="mx-auto max-w-4xl">
        <nav className="mb-12 flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-6 py-4 shadow-sm backdrop-blur">
          <a href="/home" className="text-lg font-bold">
            Vagotis Family Archive
          </a>

          <div className="hidden gap-6 text-sm font-medium text-stone-700 md:flex">
            <a href="/family-tree">Tree</a>
            <a href="/stories">Stories</a>
            <a href="/recipes">Recipes</a>
            <a href="/photos">Photos</a>
            <a href="/places">Places</a>
            <a href="/documents">Documents</a>
          </div>
        </nav>

        <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-700">
          Contribute
        </p>

        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          Share a Memory
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-700">
          Add a family story, recipe, photo idea, document note, location, or
          correction to help preserve our family history.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="font-bold">Your Name</label>
              <input
                name="name"
                type="text"
                placeholder="Example: Jacob"
                className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
                required
              />
            </div>

            <div>
              <label className="font-bold">Your Email</label>
              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="font-bold">Type of Contribution</label>
            <select
              name="type"
              className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
              required
            >
              <option value="">Select one</option>
              <option>Story</option>
              <option>Recipe</option>
              <option>Photo</option>
              <option>Document</option>
              <option>Family Tree Update</option>
              <option>Place / Location</option>
              <option>Correction</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="font-bold">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Example: Yiayia’s trip to Akrata"
              className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
              required
            />
          </div>

          <div className="mt-6">
            <label className="font-bold">Memory / Suggestion</label>
            <textarea
              name="memory"
              rows={8}
              placeholder="Write the story, recipe, correction, or suggestion here..."
              className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
              required
            />
          </div>

          <div className="mt-6">
            <label className="font-bold">Related People</label>
            <input
              name="relatedPeople"
              type="text"
              placeholder="Example: Esther Vagotis, Angela Vagotis"
              className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
            />
          </div>

          <div className="mt-6">
            <label className="font-bold">Photo / Document Note</label>
            <input
              name="photoNote"
              type="text"
              placeholder="Example: I have photos I can send later"
              className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-2xl bg-stone-950 py-4 font-bold text-white shadow hover:bg-stone-700"
          >
            Submit Memory
          </button>

          {status && (
            <p className="mt-6 text-center font-medium text-amber-700">
              {status}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}