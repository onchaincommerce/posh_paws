import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Posh Paws | Reno-Tahoe Personalized Dog Care",
  description:
    "A one-page dog boarding site for Posh Paws, Reno-Tahoe Personalized Dog Care near the airport, built around calm overnight care, strong communication, visible pricing, and inquiry-first booking.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
