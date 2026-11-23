"use client";

import { useState } from "react";
import Link from "next/link";
import { acceptMedia, acceptPhotos, readMediaAttachment } from "../media-types";

export default function MemoryForm({ listing }: { listing?: { id: string; title: string } }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [review, setReview] = useState<{
    approval: string | null;
    suggestions: string[];
    upload?: string;
    expiresAt?: number;
  } | null>(null);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  const [publishedId, setPublishedId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const read = (field: string) => String(formData.get(field) ?? "").trim();
    const selected = formData.get("attachment");
    const file = selected instanceof File && selected.name ? selected : null;
    const attachment = file ? readMediaAttachment({ type: file.type, size: file.size }) : null;
    if (listing && !attachment?.type.startsWith("image/")) {
      setStatus("Choose one JPG, PNG, WebP, or GIF up to 20 MB.");
      return;
    }
    if (file && !attachment) {
      setStatus("Choose a JPG, PNG, WebP, or GIF up to 20 MB, or an MP4, WebM, or MOV up to 100 MB.");
      return;
    }

    const data = {
      name: read("name"),
      type: listing ? "Photo" : read("type"),
      title: listing?.title ?? read("title"),
      memory: read("memory"),
      relatedPeople: read("relatedPeople"),
      photoNote: read("photoNote"),
      attachment: attachment ?? undefined,
      parentId: listing?.id,
    };

    if (!data.name || !data.type || !data.title || !data.memory) {
      setStatus(listing ? "Fill in your name and a caption first." : "Fill in your name, contribution type, title, and memory first.");
      return;
    }
    if (data.type === "Video" && !attachment?.type.startsWith("video/")) {
      setStatus("Choose a video file for this contribution.");
      return;
    }

    const approval = review?.approval;
    if (approval && review.expiresAt && Date.now() >= review.expiresAt) {
      setReview(null);
      setStatus("The review expired. Review your draft again before publishing.");
      return;
    }
    setBusy(true);
    setNeedsSignIn(false);
    setPublishedId(null);
    setStatus(approval ? "Publishing…" : "Reviewing your draft…");
    try {
      if (approval && file) {
        if (!review.upload) {
          setReview(null);
          setStatus("Review this attachment again before publishing.");
          return;
        }
        setStatus("Uploading your attachment…");
        const upload = await fetch(review.upload, {
          method: "PUT",
          headers: { "Content-Type": file.type, "If-None-Match": "*" },
          body: file,
        });
        // A previous attempt may have uploaded the file before publication finished.
        if (!upload.ok && upload.status !== 412) {
          setStatus("The attachment could not be uploaded. Your draft is still here. Try again.");
          return;
        }
        setStatus("Publishing…");
      }
      const response = await fetch(approval ? "/api/memory-publish" : "/api/memory-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(approval ? { draft: data, approval } : data),
      });
      const result = await response.json();
      if (!response.ok) {
        setNeedsSignIn(response.status === 401);
        if (response.status === 409) setReview(null);
        setStatus(result.error || "Review is temporarily unavailable.");
        return;
      }
      if (approval) {
        form.reset();
        setReview(null);
        setPublishedId(result.id);
        setStatus(listing ? "Your photo is published. You can add another below." : "Your memory is published in the family archive.");
        return;
      }
      setReview({ ...result, expiresAt: result.approval ? Date.now() + 29 * 60 * 1000 : undefined });
      setStatus(result.approval ? "Your draft passed review and is ready to publish." : "Please address the feedback below, then review again.");
    } catch {
      setStatus(approval ? "Publication could not be confirmed. Please try again." : "AI review is temporarily unavailable. Please try again.");
    } finally {
      setBusy(false);
    }
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
          {listing ? "Add a photo" : "Share a Memory"}
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-700">
          {listing ? (
            <>Add one photo to <Link className="underline" href={`/memories#${listing.id}`}>{listing.title}</Link>.</>
          ) : "Add a family story, recipe, photo, video, document note, location, or correction to help preserve our family history."}
        </p>

        <form
          onSubmit={handleSubmit}
          onChange={() => {
            setReview(null);
            setStatus("");
            setPublishedId(null);
          }}
          className="mt-12 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur"
        >
          <fieldset disabled={busy} aria-busy={busy}>
            <div>
              <div>
                <label htmlFor="name" className="font-bold">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  maxLength={120}
                  placeholder="Example: Jacob"
                  className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
                  required
                />
              </div>

            </div>

            {!listing && <div className="mt-6">
              <label htmlFor="type" className="font-bold">Type of Contribution</label>
              <select
                id="type"
                name="type"
                className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
                required
              >
                <option value="">Select one</option>
                <option>Story</option>
                <option>Recipe</option>
                <option>Photo</option>
                <option>Video</option>
                <option>Document</option>
                <option>Family Tree Update</option>
                <option>Place / Location</option>
                <option>Correction</option>
              </select>
            </div>}

            {!listing && <div className="mt-6">
              <label htmlFor="title" className="font-bold">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                maxLength={160}
                placeholder="Example: Yiayia’s trip to Akrata"
                className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
                required
              />
            </div>}

            <div className="mt-6">
              <label htmlFor="memory" className="font-bold">{listing ? "Caption" : "Memory or caption"}</label>
              <textarea
                id="memory"
                name="memory"
                rows={listing ? 3 : 8}
                maxLength={8000}
                placeholder={listing ? "Who or what is shown in this photo?" : "Write your memory or describe who or what is in the attachment..."}
                className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
                required
              />
            </div>

            <div className="mt-6">
              <label htmlFor="relatedPeople" className="font-bold">Related People</label>
              <input
                id="relatedPeople"
                name="relatedPeople"
                type="text"
                maxLength={300}
                placeholder="Example: Esther Vagotis, Angela Vagotis"
                className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
              />
            </div>

            {!listing && <div className="mt-6">
              <label htmlFor="photoNote" className="font-bold">Photo / Document Note</label>
              <input
                id="photoNote"
                name="photoNote"
                type="text"
                maxLength={500}
                placeholder="Example: I have photos I can send later"
                className="mt-2 w-full rounded-2xl border border-stone-300 px-5 py-4 outline-none focus:border-amber-600"
              />
            </div>}

            <div className="mt-6">
              <label htmlFor="attachment" className="font-bold">{listing ? "Photo" : "Photo or video"}</label>
              <input
                id="attachment"
                name="attachment"
                type="file"
                accept={listing ? acceptPhotos : acceptMedia}
                required={Boolean(listing)}
                aria-describedby="attachment-help"
                className="mt-2 block w-full rounded-2xl border border-stone-300 p-3"
              />
              <p id="attachment-help" className="mt-2 text-sm text-stone-600">
                {listing ? "One JPG, PNG, WebP, or GIF up to 20 MB." : "One photo up to 20 MB or one video up to 100 MB. MP4 works in most browsers."}
              </p>
            </div>

            <p className="mt-6 text-sm text-stone-700">
              AI review checks your written description. Your attachment is uploaded when you publish.
            </p>
            <button
              type="submit"
              className="mt-4 w-full rounded-2xl bg-stone-950 py-4 font-bold text-white shadow hover:bg-stone-700 disabled:opacity-60"
            >
              {review?.approval ? (listing ? "Publish Photo" : "Publish Memory") : "Review with AI"}
            </button>
          </fieldset>

          <div aria-live="polite">
            {status && <p className="mt-6 font-medium text-amber-800">{status}</p>}
            {review && !review.approval && (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-stone-700">
                {review.suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)}
              </ul>
            )}
            {publishedId && (
              <Link href={`/memories#${publishedId}`} className="mt-3 inline-block font-semibold underline">
                {listing ? "View your published photo" : "View your published memory"}
              </Link>
            )}
            {needsSignIn && (
              <a href="/?signIn=memory-review" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold underline">
                Open family sign-in in a new tab
              </a>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
