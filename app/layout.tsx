import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/toaster";

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
  ],
  authors: [{ name: "Jérémie BENCINI" }],
  creator: "Jérémie BENCINI",
  publisher: "Cookster",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <main>{children}</main>
          <Toaster />
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
