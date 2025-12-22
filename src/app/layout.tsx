import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import DeviceGuard from "@/components/DeviceGuard";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CodeEditor",
  description: "Your Codebase - everything in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 flex flex-col`}
      >
        <ClerkProvider>
          <ConvexClientProvider>
            <DeviceGuard>{children}</DeviceGuard>
          </ConvexClientProvider>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
