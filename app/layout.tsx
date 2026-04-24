import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepak's Portfolio",
  description:
    "A futuristic portfolio built with Next.js, React Three Fiber, GSAP, and Tailwind CSS.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
