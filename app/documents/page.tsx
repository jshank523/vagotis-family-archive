"use client";

import { useState } from "react";
const categories = [
  "All",
  "Military Records",
  "Birth & Death Records",
  "Family Trees",
  "Restaurants",
  "Church & Community",
  "Travel Memories",
  "Newspaper Articles",
];
const documents = [
  {
    id: 3,
    title: "From Our President – Angela T. Vagotis",
    type: "Magazine Feature",
    category: "Newspaper Articles",
    person: "Angela T. Vagotis",
    year: "November 2024",
    image: "/documents/angela-vagotis-president.png",
    link: "#",
    description:
      "A feature from the Stark County Bar Journal written by Angela T. Vagotis, President of the Stark County Bar Association. In this article she shares the story of her father, Angelo Jack Vagotis, his World War II service, military honors, marriage to Esther, and his lifelong dedication to family and community.",
  },

  {
    id: 1,
    title: "Yankee Coffee Shop",
    type: "Photo + Article",
    category: "Restaurants",
    person: "George Kolidakis",
    year: "Hopewell, Virginia",
    image: "/documents/yankee-coffee-shop.webp",
    link:
      "https://www.progress-index.com/story/business/2021/03/03/iconic-yankee-coffee-shop-petersburg-virginia-serves-breakfast-and-lunch-for-over-four-decades/6906545002/",
    description:
      "A photo of Yankee Coffee Shop in Hopewell, Virginia, which George Kolidakis owned and ran.",
  },

  {
    id: 6,
    title: "Red Barn Restaurant Memories",
    type: "Family Business Memory",
    category: "Restaurants",
    person: "Angelo (Jack) Vagotis • Angela Vagotis • Francine Vagotis",
    year: "Canton, Ohio",
    image: "/documents/redbarn.png",
    link: "#",
    description:
      "Angelo (Jack) Vagotis owned the land where the Red Barn stood. Visiting Red Barn for burgers and collecting Red Barn coupons was a constant part of life for Angela and Francine growing up. It became one of those small everyday places that turned into an important family memory.",
  },

  {
    id: 10,
    title: "Canale Souvlaki Stand – Corinth Tradition",
    type: "Family Travel Memory",
    category: "Travel Memories",
    person: "Esther (Yiayia) Vagotis • Angela Vagotis • Jacob Shankel",
    year: "Isthmus of Corinth, Greece",
    image: "/documents/canale-souvlaki.jpg",
    link: "#",
    description:
      "This souvlaki stand at the Isthmus of Corinth was a special stop for Esther, lovingly called Yiayia, whenever traveling from Athens to Akrata. It became part of the family tradition—stopping there before continuing the journey home to the village. Angela later continued the tradition and took Jacob there as well, making it another small but meaningful place passed down through generations.",
  },

  {
    id: 7,
    title: "Topp's Chalet Family Memories",
    type: "Family Restaurant Memory",
    category: "Restaurants",
    person: "Vagotis Family",
    year: "Canton, Ohio",
    image: "/documents/toppschalet.jpg",
    link:
      "https://www.facebook.com/starkcountyLove/posts/topps-chaleta-prominent-restaurant-located-on-the-northwest-corner-of-everhard-r/768994128824970/",
    description:
      "Topp's Chalet was a well-known family restaurant frequently visited by the Vagotis family in Canton. It was one of those memorable gathering places tied to family dinners, celebrations, and everyday life. Sadly, the restaurant was later lost in a fire, making old photos like this especially meaningful.",
  },

  {
    id: 2,
    title: "Esther Tzortzakis Vagotis, 90",
    type: "Newspaper Article",
    category: "Newspaper Articles",
    person: "Esther Vagotis",
    year: "May 4, 2014",
    image: "/documents/esther-90th-birthday.png",
    link:
      "https://www.cantonrep.com/story/lifestyle/celebrations/birthday/2014/05/04/esther-tzortzakis-vagotis-90/37434715007/",
    description:
      "A newspaper article honoring Esther Tzortzakis Vagotis for her 90th birthday.",
  },

  {
    id: 9,
    title: "St. Haralambos Greek Orthodox Church",
    type: "Family Church",
    category: "Church & Community",
    person: "Vagotis • Tzortzakis Family",
    year: "Canton, Ohio",
    image: "/documents/St.-Haralambos.jpg",
    link: "https://www.stharalambos.com/",
    description:
      "St. Haralambos Greek Orthodox Church in Canton, Ohio has been the family church for generations and remains one of the most important places in the family’s history. It is especially meaningful because it shares the same church name as the family church in Akrata, Greece—St. Haralambos—creating a beautiful connection between the family’s Greek roots and their life in America. The church has served as the center for baptisms, weddings, holidays, and lifelong family traditions.",
  },

  {
    id: 8,
    title: "Lucky’s Souvlakis – Santorini Tradition",
    type: "Family Travel Memory",
    category: "Travel Memories",
    person: "Francine Vagotis Smeester Family",
    year: "Santorini, Greece",
    image: "/documents/luckys.webp",
    link: "#",
    description:
      "Lucky’s Souvlakis in Santorini became a special family tradition after Francine and her family first discovered it during their travels to Greece.",
  },
{
  id: 11,
  title: "Angelo Jack Vagotis Veterans Records",
  type: "Military Records",
  category: "Military Records",
  person: "Angelo Jack Vagotis",
  year: "World War II",
  image: "/documents/dads-veterans-records.pdf",
  link: "/documents/dads-veterans-records.pdf",
  description:
    "Military records connected to Angelo Jack Vagotis, including National Personnel Records Center correspondence and wartime service paperwork.",
},

{
  id: 12,
  title: "Esther Vagotis Family Tree Notes",
  type: "Family Tree",
  category: "Family Trees",
  person: "Esther Tzortzakis Vagotis",
  year: "March 7, 2003",
  image: "/documents/esther-family-tree.pdf",
  link: "/documents/esther-family-tree.pdf",
  description:
    "Family tree notes for Esther Tzortzakis Vagotis, including information about her parents, siblings, Greek roots, and family burial locations.",
},

{
  id: 13,
  title: "The Tzortzakis Family Memorial Page",
  type: "Family Tree",
  category: "Family Trees",
  person: "Tzortzakis Family",
  year: "Family Memorial",
  image: "/documents/tzortzakis-family.pdf",
  link: "/documents/tzortzakis-family.pdf",
  description:
    "A memorial page honoring Kostandinos and Vasiliki Tzortzakis, their children, and extended family history.",
},

{
  id: 14,
  title: "Angelo Vagotis Death Certificate",
  type: "Death Record",
  category: "Birth & Death Records",
  person: "Angelo Jack Vagotis",
  year: "1989",
  image: "/documents/angelo-death-certificate.pdf",
  link: "/documents/angelo-death-certificate.pdf",
  description:
    "Official death certificate for Angelo Jack Vagotis.",
},

{
  id: 15,
  title: "Esther Vagotis Birth Certificate",
  type: "Birth Record",
  category: "Birth & Death Records",
  person: "Esther Tzortzakis Vagotis",
  year: "1924",
  image: "/documents/esther-birth-certificate.pdf",
  link: "/documents/esther-birth-certificate.pdf",
  description:
    "Official birth certificate for Esther Tzortzakis Vagotis.",
},

{
  id: 16,
  title: "Esther Vagotis Death Certificate",
  type: "Death Record",
  category: "Birth & Death Records",
  person: "Esther Tzortzakis Vagotis",
  year: "2017",
  image: "/documents/esther-death-certificate.pdf",
  link: "/documents/esther-death-certificate.pdf",
  description:
    "Official death certificate for Esther Tzortzakis Vagotis.",
},
{
  id: 17,
  title: "Greek Naturalization Certificates",
  type: "Immigration Record",
  category: "Military Records",
  person: "Angelina Vagotis • George Vagotis",
  year: "1936–1938",
  image: "/documents/greek-naturalization-certificates.pdf",
  link: "/documents/greek-naturalization-certificates.pdf",
  description:
    "Official U.S. naturalization certificates for Angelina Vagotis and George Vagotis from Stark County, Ohio, documenting their immigration from Greece and citizenship records.", 
},

{
  id: 18,
  title: "Ellis Island Wall of Honor + Esther Birth Record",
  type: "Immigration + Birth Record",
  category: "Birth & Death Records",
  person: "Vasiliki Spiropoulou Tzortzakakis • Anastasia Tzortzakis",
  year: "1924",
  image: "/documents/ellis-island-esther-records.pdf",
  link: "/documents/ellis-island-esther-records.pdf",
  description:
    "Includes the Ellis Island Wall of Honor certificate for Vasiliki Spiropoulou Tzortzakakis and the Ohio birth certificate for Anastasia Tzortzakis.", 
},

{
  id: 19,
  title: "Tzortzakis Family Burial Maps + Cemetery Records",
  type: "Family Tree + Burial Records",
  category: "Family Trees",
  person: "Tzortzakis Family",
  year: "Family Memorial Records",
  image: "/documents/tzortzakis-burial-records.pdf",
  link: "/documents/tzortzakis-burial-records.pdf",
  description:
    "Family burial locations, cemetery section maps, gravestone photos, and records for George Vagotis, Angelo (Jack) Vagotis, and the extended Tzortzakis family.", 
},

{
  id: 20,
  title: "Angela Vagotis Feature Article",
  type: "Newspaper Article",
  category: "Newspaper Articles",
  person: "Angela Vagotis",
  year: "June 2, 1996",
  image: "/documents/angela-feature-article.pdf",
  link: "/documents/angela-feature-article.pdf",
  description:
    "A featured newspaper article from The Repository highlighting Angela Vagotis and her career journey, titled 'Change, of course.'", 
},
];

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
const [activeCategory, setActiveCategory] = useState("All");

const filteredDocuments =
  activeCategory === "All"
    ? documents
    : documents.filter(
        (document) => document.category === activeCategory
      );

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
  Family Documents
</p>
        <h1 className="text-5xl font-black">Documents & Records</h1>

        <p className="mt-6 max-w-2xl text-xl leading-9 text-stone-700">
          Preserve photos, newspaper articles, records, and meaningful family
          history.
        </p>
<div className="mt-10 flex flex-wrap gap-3">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setActiveCategory(category)}
      className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
        activeCategory === category
          ? "bg-stone-950 text-white"
          : "border border-stone-300 bg-white hover:border-amber-700 hover:text-amber-700"
      }`}
    >
      {category}
    </button>
  ))}
</div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {filteredDocuments.map((document) => (
            <article
              key={document.id}
              className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {document.image.endsWith(".pdf") || document.image.endsWith(".doc") ? (
  <div className="h-64 w-full overflow-hidden bg-stone-100">
    <iframe
      src={document.link}
      className="h-[520px] w-full origin-top scale-[0.5] border-0"
    />
  </div>
) : (
  <img
    src={document.image}
    alt={document.title}
    className="h-64 w-full object-cover"
  />
)}

              <div className="p-7">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
                  {document.type}
                </p>

                <h2 className="mt-4 text-2xl font-black">
                  {document.title}
                </h2>

                <p className="mt-3 text-sm font-medium text-stone-500">
                  {document.year} • {document.person}
                </p>

                <p className="mt-5 leading-7 text-stone-700">
                  {document.description}
                </p>

                <div className="mt-7 flex gap-3">
  <button
    onClick={() => setSelectedDoc(document)}
    className="rounded-2xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white hover:bg-stone-700"
  >
    View Document
  </button>

  {document.link !== "#" && (
    <a
      href={document.link}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-2xl border border-stone-300 px-5 py-3 text-sm font-semibold hover:bg-stone-50"
    >
      Original Article
    </a>
  )}
</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedDoc && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[2rem] bg-white p-6 shadow-2xl">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute right-6 top-6 rounded-full bg-stone-100 px-4 py-2 text-lg font-bold hover:bg-stone-200"
            >
              ×
            </button>

            {selectedDoc.link.endsWith(".pdf") ? (
  <iframe
    src={selectedDoc.link}
    className="h-[75vh] w-full rounded-2xl border border-stone-200"
  />
) : selectedDoc.link.endsWith(".doc") ? (
  <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl bg-stone-100 text-stone-500">
    <div className="text-7xl">📄</div>
    <p className="mt-4 font-semibold">
      Word documents open/download from the button below.
    </p>
  </div>
) : (
  <img
    src={selectedDoc.image}
    alt={selectedDoc.title}
    className="w-full rounded-2xl object-contain"
  />
)}

            <div className="mt-6">
              <h2 className="text-3xl font-black">{selectedDoc.title}</h2>

              <p className="mt-2 text-stone-500">
                {selectedDoc.year} • {selectedDoc.person}
              </p>

              <p className="mt-4 leading-8 text-stone-700">
                {selectedDoc.description}
              </p>

              <a
                href={selectedDoc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-2xl bg-stone-950 px-6 py-3 font-semibold text-white hover:bg-stone-700"
              >
                Read Original Article
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}