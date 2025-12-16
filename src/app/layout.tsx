import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className="bg-white text-black antialiased">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#000000",
              colorBackground: "#ffffff",
              colorText: "#171717",
              colorInputBackground: "#ffffff",
              colorInputText: "#171717",
            },
            elements: {
              // These Tailwind classes will now work because 'bg-white' isn't fighting 'dark:' classes
              formButtonPrimary: "bg-black text-white hover:bg-zinc-800",
              card: "shadow-sm border border-zinc-200",
              headerTitle: "text-black",
              headerSubtitle: "text-zinc-500",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
