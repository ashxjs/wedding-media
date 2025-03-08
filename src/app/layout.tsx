import type { Metadata } from "next";
import { Playwrite_FR_Moderne } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Léana & Alexis: Photos et vidéos de notre mariage",
  description:
    "M & Mme Hurunghee sont heureux de vous partager leurs photos et vidéos de mariage",
  keywords: ["noindex"],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Léana & Alexis: Photos et vidéos de notre mariage",
    description:
      "M & Mme Hurunghee sont heureux de vous partager leurs photos et vidéos de mariage",
    images: [
      {
        url: "/l_a_og_images.webp",
        width: 300,
        height: 600,
        alt: "Léana & Alexis: Photos et vidéos de notre mariage",
      },
    ],
  },
};

const playwrite = Playwrite_FR_Moderne({
  variable: "--font-playwrite",
  weight: ["100", "200", "300", "400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playwrite.variable} ${playwrite.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
