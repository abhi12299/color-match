import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Color Matching Game",
  description: "Match the colors in a limited number of moves!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
