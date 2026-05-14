import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vagotis Family Archive",
  description:
    "A private digital archive preserving Vagotis family stories, photos, recipes, documents, and history across generations.",
  keywords: [
    "Vagotis family",
    "family archive",
    "family history",
    "Greek family history",
    "family recipes",
    "family stories",
    "family photos"
  ],
  openGraph: {
    title: "Vagotis Family Archive",
    description:
      "Preserving family stories, recipes, memories, and history for future generations.",
    url: "https://www.vagotisfamily.com",
    siteName: "Vagotis Family Archive",
    images: [
      {url: "/images/vagotis-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Vagotis Family Archive"
      }
    ],
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}