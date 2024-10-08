import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";

import ProgressBar from "@/components/ProgressBar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const rubik = Rubik({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rubik",
});
const satoshi = localFont({
  src: [
    {
      path: "../fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../fonts/satoshi/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/satoshi/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "StudySync",
  description: "Transforming Studying with AI-Powered Tools on StudySync",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${rubik.variable} ${satoshi.variable}`}>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Suspense>
            <ProgressBar />
          </Suspense>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
