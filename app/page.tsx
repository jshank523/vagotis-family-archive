"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const FAMILY_PASSWORD = "0228";

  useEffect(() => {
    const access = sessionStorage.getItem("family-access");

    if (access && Date.now() < Number(access)) {
      router.push("/home");
    }
  }, [router]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (password === FAMILY_PASSWORD) {
      const expiresAt = Date.now() + 5 * 60 * 1000;
      sessionStorage.setItem("family-access", String(expiresAt));
      router.push("/home");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f2ea] px-6 py-12 text-stone-950">
      <section className="mx-auto flex min-h-[85vh] max-w-7xl items-center justify-center">
        <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/80 p-10 text-center shadow-2xl backdrop-blur">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-700">
            Private Archive
          </p>

          <h1 className="text-4xl font-black tracking-tight">
            Vagotis Family Archive
          </h1>

          <p className="mt-4 leading-7 text-stone-600">
            This family archive is private. Please enter the family password to
            continue.
          </p>

          <form onSubmit={handleLogin} className="mt-8">
            <input
              required
              autoFocus
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-center text-lg outline-none focus:border-amber-600"
              placeholder="Enter password"
            />

            {error && (
              <p className="mt-4 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-stone-950 py-4 font-semibold text-white shadow hover:bg-stone-700"
            >
              Enter Archive
            </button>
          </form>

          <p className="mt-6 text-xs text-stone-400">
            Access expires after 5 minutes.
          </p>
        </div>
      </section>
    </main>
  );
}