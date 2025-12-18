import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";

export const metadata: Metadata = {
  title: "CodeEditor",
  description: "Your Codebase - everything in same place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Explicitly set light mode on the HTML tag
    <ClerkProvider>
      <html lang="en" className="light" style={{ colorScheme: "light" }}>
        <body className="bg-white text-black antialiased">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
