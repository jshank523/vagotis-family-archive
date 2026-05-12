"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

const placesLived = [
  {
    name: "Akrata, Greece",
    lat: 38.1541,
    lng: 22.314,
    family: "Vasiliki Tzortzakis Family",
    years: "Family Origins",
    category: "Family Roots",
  },
  {
    name: "Crete, Greece",
    lat: 35.2401,
    lng: 24.8093,
    family: "Kostandinos Tzortzakis Family",
    years: "Family Origins",
    category: "Family Roots",
  },
  {
    name: "Samos, Greece",
    lat: 37.7543,
    lng: 26.9773,
    family: "Angela and George Vagotis Family",
    years: "Family Origins",
    category: "Family Roots",
  },
  {
    name: "Canton, Ohio, USA",
    lat: 40.7989,
    lng: -81.3784,
    family: "Esther & Angelo (Jack) Vagotis Family",
    years: "Maternal + Paternal Family Home",
    category: "Family Roots",
  },
  {
    name: "Hopewell, Virginia, USA",
    lat: 37.3043,
    lng: -77.2872,
    family: "George and Despina (Loula) Kolidakis Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "Cleveland, Ohio, USA",
    lat: 41.4993,
    lng: -81.6944,
    family: "Rosemarie and George Vagotis Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "Grand Rapids, Michigan, USA",
    lat: 42.9634,
    lng: -85.6681,
    family: "Francine (Vagotis) and Chuck Smeester Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "Canton, Ohio, USA",
    lat: 40.7989,
    lng: -81.3784,
    family: "Angela Vagotis Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "Scottsdale, Arizona, USA",
    lat: 33.4942,
    lng: -111.9261,
    family: "Astacia (Vagotis) and Nick Myers Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "Avon, Ohio, USA",
    lat: 41.4517,
    lng: -82.0354,
    family: "Christina (Vagotis) and Jason Harless Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "Avon, Ohio, USA",
    lat: 41.4517,
    lng: -82.0354,
    family: "Jacqueline (Vagotis) and Rick Novotny Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "Chicago, Illinois, USA",
    lat: 41.8781,
    lng: -87.6298,
    family: "Nina (Byun) and Luke Smeester Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "San Diego, California, USA",
    lat: 32.7157,
    lng: -117.1611,
    family: "Valerie and Jan Zeverina Family",
    years: "Family Branch",
    category: "Family Branch",
  },
  {
    name: "Maine, USA",
    lat: 45.2538,
    lng: -69.4455,
    family: "Stavro and Sasha Vurnakes Family",
    years: "Family Branch",
    category: "Family Branch",
  },
];

export default function PlacesPage() {
  const globeRef = useRef<any>(null);

  const points = useMemo(
    () =>
      placesLived.map((place) => ({
        ...place,
        size: 0.25,
        color: "#d97706",
      })),
    []
  );

  function flyToPlace(place: any) {
    globeRef.current?.pointOfView(
      {
        lat: place.lat,
        lng: place.lng,
        altitude: 1.6,
      },
      1200
    );
  }

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
          Places Lived
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Where Our Family Has Been
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-700">
              Explore the places our family has lived, traveled from, and
              called home across generations—from origins to today.
            </p>
          </div>

          <div className="rounded-[2rem] bg-stone-950 p-7 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Family journey
            </p>

            <p className="mt-3 leading-7 text-stone-300">
              Click a family location to fly the globe to that city.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="flex items-center justify-center overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-900 shadow-2xl">
            <Globe
              ref={globeRef}
              width={820}
              height={700}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              pointsData={points}
              pointLat="lat"
              pointLng="lng"
              pointAltitude={0.03}
              pointRadius="size"
              pointColor="color"
              pointLabel={(place: any) => `
                <div style="
                  background: white;
                  color: black;
                  padding: 12px;
                  border-radius: 12px;
                  min-width: 180px;
                ">
                  <strong>${place.name}</strong><br />
                  ${place.family}<br />
                  ${place.years}
                </div>
              `}
            />
          </div>

          <aside className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-xl backdrop-blur">
            <h2 className="text-2xl font-black">Family Locations</h2>

            <div className="mt-6 space-y-4">
              {placesLived.map((place) => (
                <button
                  key={place.name + place.family}
                  onClick={() => flyToPlace(place)}
                  className="w-full rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-600 hover:shadow-md"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                    {place.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">{place.name}</h3>

                  <p className="mt-2 text-sm text-stone-500">
                    {place.family}
                  </p>

                  <p className="mt-2 text-sm text-amber-700">{place.years}</p>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}