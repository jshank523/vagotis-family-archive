"use client";

import { useState } from "react";

type Gender = "male" | "female";

type Person = {
  name: string;
  relation: string;
  years?: string;
  gender: Gender;
  details?: string;
};

const person = (
  name: string,
  relation: string,
  gender: Gender,
  details?: string,
  years = "Born ____"
): Person => ({ name, relation, gender, details, years });

function PersonCard({
  person,
  onClick,
  spouse = false,
}: {
  person: Person;
  onClick: () => void;
  spouse?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-2xl border bg-white p-4 text-center shadow-sm transition hover:z-50 hover:-translate-y-1 hover:scale-105 hover:border-amber-600 hover:shadow-2xl ${
        spouse
          ? "-ml-8 mt-6 w-40 opacity-75"
          : "z-20 w-48 border-stone-200"
      }`}
    >
      <div
        className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
          person.gender === "male"
            ? "bg-blue-100 text-blue-900"
            : "bg-rose-100 text-rose-900"
        }`}
      >
        {person.gender === "male" ? "♂" : "♀"}
      </div>

      <h3 className="text-sm font-black leading-tight">{person.name}</h3>
      <p className="mt-1 text-xs font-semibold text-amber-700">
        {person.relation}
      </p>
      <p className="mt-1 text-xs text-stone-500">{person.years}</p>
    </button>
  );
}

function FamilyUnit({
  main,
  spouse,
  children,
  onSelect,
}: {
  main: Person;
  spouse?: Person;
  children?: React.ReactNode;
  onSelect: (person: Person) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-start justify-center">
        <PersonCard person={main} onClick={() => onSelect(main)} />

        {spouse && (
          <PersonCard
            person={spouse}
            spouse
            onClick={() => onSelect(spouse)}
          />
        )}
      </div>

      {children && (
        <>
          <div className="h-8 w-px bg-stone-400" />
          <div className="mb-0 h-px w-full max-w-[720px] bg-stone-400" />
          <div className="grid gap-5 pt-0">{children}</div>
        </>
      )}
    </div>
  );
}

function ChildCard({
  person,
  onSelect,
}: {
  person: Person;
  onSelect: (person: Person) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-6 w-px bg-stone-400" />
      <PersonCard person={person} onClick={() => onSelect(person)} />
    </div>
  );
}

export default function FamilyTreePage() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <main className="min-h-screen bg-[#f7f2ea] px-6 py-10 text-stone-950">
      <section className="mx-auto max-w-none">
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

        </nav>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-amber-700">
          Family Tree
        </p>

        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          Our Family Tree
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
          Spouses are tucked slightly behind the blood family member. Blue icons
          are male, pink icons are female. Click any card for details.
        </p>

        <div className="mt-10 overflow-x-auto overflow-y-visible rounded-[2rem] border border-white/70 bg-white/70 p-10 shadow-xl backdrop-blur">
  <div className="mx-auto w-[2600px] origin-top">
            <div className="grid grid-cols-2 gap-20">
              <FamilyUnit
                main={person(
                  "George Vagotis",
                  "Great Grandfather",
                  "male",
                  "From Samos, Greece.",
                  "From Samos, Greece"
                )}
                spouse={person(
                  "Angela Vagotis",
                  "Great Grandmother",
                  "female",
                  "From Samos, Greece.",
                  "From Samos, Greece"
                )}
                onSelect={setSelectedPerson}
                children={
                  <div className="grid grid-cols-4 gap-5">
                    {[
                      person("Costandino (Gust) Vagotis", "Sibling", "male"),
                      person("Vasilia (Bess) Vagotis", "Sibling", "female"),
                      person("Clara Vagotis", "Sibling", "female"),
                      person("Angelo (Jack) Vagotis", "Sibling", "male"),
                    ].map((p) => (
                      <ChildCard key={p.name} person={p} onSelect={setSelectedPerson} />
                    ))}
                  </div>
                }
              />

              <FamilyUnit
                main={person(
                  "Costandinos",
                  "Great Grandfather",
                  "male",
                  "From Crete, Greece.",
                  "From Crete, Greece"
                )}
                spouse={person(
                  "Vasiliki",
                  "Great Grandmother",
                  "female",
                  "From Akrata, Greece.",
                  "From Akrata, Greece"
                )}
                onSelect={setSelectedPerson}
                children={
                  <div className="grid grid-cols-5 gap-5">
                    <ChildCard person={person("Stavro Tzortzakis", "Child", "male")} onSelect={setSelectedPerson} />
                    <ChildCard person={person("Kelly Tzortzakis", "Child", "male")} onSelect={setSelectedPerson} />

                    <FamilyUnit
                      main={person("Despina (Loula) Kolidakis", "Child", "female")}
                      spouse={person("George Kolidakis", "Husband", "male")}
                      onSelect={setSelectedPerson}
                      children={
                        <div className="grid grid-cols-3 gap-5">
                          <ChildCard person={person("Stavro Kolidakis", "Child", "male")} onSelect={setSelectedPerson} />

                          <FamilyUnit
                            main={person("Emmanuel Kolidakis", "Child", "male")}
                            onSelect={setSelectedPerson}
                            children={
                              <div className="grid grid-cols-1 gap-4">
                                <FamilyUnit
                                  main={person("Emmanuel Nicholas Kolidakis (Ronnie)", "Son", "male")}
                                  onSelect={setSelectedPerson}
                                  children={
                                    <div className="grid grid-cols-3 gap-4">
                                      {[
                                        person("Khyra Kolidakis", "Child", "female"),
                                        person("Aryhk Kolidakis", "Child", "male"),
                                        person("Nikayla Kolidakis", "Child", "female"),
                                      ].map((p) => (
                                        <ChildCard key={p.name} person={p} onSelect={setSelectedPerson} />
                                      ))}
                                    </div>
                                  }
                                />
                              </div>
                            }
                          />

                          <FamilyUnit
                            main={person("Valerie Kolidakis", "Child", "female")}
                            spouse={person("Constandino (Dean) Vurnakes", "Husband", "male")}
                            onSelect={setSelectedPerson}
                            children={
                              <ChildCard
                                person={person("Stavro Vurnakes", "Son", "male")}
                                onSelect={setSelectedPerson}
                              />
                            }
                          />
                        </div>
                      }
                    />

                    <ChildCard person={person("Esther Vagotis", "Child", "female")} onSelect={setSelectedPerson} />

                    <FamilyUnit
                      main={person("Pauline Tzortzakis", "Child", "female")}
                      onSelect={setSelectedPerson}
                      children={
                        <FamilyUnit
                          main={person("Valerie Zeverina", "Daughter", "female")}
                          spouse={person("Jan Zeverina", "Husband", "male")}
                          onSelect={setSelectedPerson}
                          children={
                            <div className="grid grid-cols-2 gap-4">
                              <ChildCard person={person("Andrew Zeverina", "Child", "male")} onSelect={setSelectedPerson} />
                              <ChildCard person={person("Lauren Zeverina", "Child", "female")} onSelect={setSelectedPerson} />
                            </div>
                          }
                        />
                      }
                    />
                  </div>
                }
              />
            </div>

            <div className="mt-20 flex justify-center">
              <FamilyUnit
                main={person("Esther Vagotis", "Wife", "female")}
                spouse={person("Angelo (Jack) Vagotis", "Husband", "male")}
                onSelect={setSelectedPerson}
                children={
                  <div className="grid grid-cols-3 gap-12">
                    <FamilyUnit
                      main={person("George Vagotis", "Son", "male")}
                      spouse={person("Rosemarie Schneider", "Wife", "female")}
                      onSelect={setSelectedPerson}
                      children={
                        <div className="grid grid-cols-3 gap-5">
                          <FamilyUnit
                            main={person("Astacia Vagotis", "Daughter", "female")}
                            spouse={person("Nick Myers", "Husband", "male")}
                            onSelect={setSelectedPerson}
                            children={
                              <div className="grid grid-cols-3 gap-4">
                                <ChildCard person={person("Rosemarie Myers", "Child", "female")} onSelect={setSelectedPerson} />
                                <ChildCard person={person("Luca Myers", "Child", "male")} onSelect={setSelectedPerson} />
                                <ChildCard person={person("Vivien Myers", "Child", "female")} onSelect={setSelectedPerson} />
                              </div>
                            }
                          />

                          <FamilyUnit
                            main={person("Christina Vagotis", "Daughter", "female")}
                            spouse={person("Jason Harless", "Husband", "male")}
                            onSelect={setSelectedPerson}
                            children={
                              <ChildCard person={person("Alexander Harless", "Son", "male")} onSelect={setSelectedPerson} />
                            }
                          />

                          <FamilyUnit
                            main={person("Jacqueline Vagotis", "Daughter", "female")}
                            spouse={person("Rick Novotny", "Husband", "male")}
                            onSelect={setSelectedPerson}
                            children={
                              <div className="grid grid-cols-2 gap-4">
                                <ChildCard person={person("Rozalyn Novotny", "Daughter", "female")} onSelect={setSelectedPerson} />
                                <ChildCard person={person("Jocelyn Novotny", "Daughter", "female")} onSelect={setSelectedPerson} />
                              </div>
                            }
                          />
                        </div>
                      }
                    />

                    <FamilyUnit
                      main={person("Francine Vagotis", "Daughter", "female")}
                      spouse={person("Chuck Smeester", "Husband", "male")}
                      onSelect={setSelectedPerson}
                      children={
                        <div className="grid grid-cols-2 gap-5">
                          <FamilyUnit
                            main={person("Luke Smeester", "Son", "male")}
                            spouse={person("Nina Byun", "Wife", "female")}
                            onSelect={setSelectedPerson}
                          />
                          <ChildCard person={person("Lea Smeester", "Daughter", "female")} onSelect={setSelectedPerson} />
                        </div>
                      }
                    />

                    <FamilyUnit
                      main={person("Angela Vagotis", "Daughter", "female")}
                      onSelect={setSelectedPerson}
                      children={
                        <ChildCard person={person("Jacob Shankel", "Son", "male")} onSelect={setSelectedPerson} />
                      }
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {selectedPerson && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-stone-950/50 p-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
            <div
              className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full text-5xl ${
                selectedPerson.gender === "male"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-rose-100 text-rose-900"
              }`}
            >
              {selectedPerson.gender === "male" ? "♂" : "♀"}
            </div>

            <h2 className="text-3xl font-black">{selectedPerson.name}</h2>
            <p className="mt-2 font-semibold text-amber-700">
              {selectedPerson.relation}
            </p>
            <p className="mt-2 text-stone-500">{selectedPerson.years}</p>

            <p className="mt-5 leading-7 text-stone-700">
              {selectedPerson.details ||
                "More family details can be added here later."}
            </p>

            <button
              onClick={() => setSelectedPerson(null)}
              className="mt-7 rounded-2xl bg-stone-950 px-7 py-3 font-semibold text-white hover:bg-stone-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}