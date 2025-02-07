import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import AdSense from "@/components/AdSense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cookster - Aggrégateur de recettes et liste de courses automatique",
  description:
    "Découvrez, créez et partagez de délicieuses recettes avec Cookster. Votre application mobile incontournable pour la cuisine, la planification des repas et liste de courses automatique.",
  keywords: [
    "cuisine",
    "recettes",
    "planification repas",
    "application cuisine",
    "cuisine maison",
    "recettes faciles",
    "astuces cuisine",
    "liste de courses",
    "aggrégateur de recettes",
    "livre de recettes digital",
  ],
  authors: [{ name: "Jérémie BENCINI" }],
  creator: "Jérémie BENCINI",
  publisher: "Cookster",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title:
      "Cookster - Livre de recettes numérique et liste de courses automatique",
    description:
      "Découvrez, créez et partagez de délicieuses recettes avec Cookster. Votre application mobile incontournable pour la cuisine, la planification des repas et liste de courses automatique.",
    images: [
      {
        url: "https://tkqtjvnbczblmmmkdodh.supabase.co/storage/v1/object/public/image_recipe_bucket/54a8583e-57d6-45ab-b874-a3f9a5f6a22c/0.7586322824369135-1738351180904.png",
        width: 800,
        height: 600,
        alt: "Cookster - Livre de recettes numérique et liste de courses automatique",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="fr">
        <head>
          <AdSense pId="9330956403058480" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.lemonSqueezyAffiliateConfig = {
                store: 'cookster',
                debug: true
              }`,
            }}
          />
          <script src="https://lmsqueezy.com/affiliate.js" defer />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>{children}</main>
          <Analytics />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
