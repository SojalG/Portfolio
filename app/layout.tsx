import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luminara Studio | Cinematic 3D Web Experiences",
  description:
    "A futuristic interactive 3D landing page built with Next.js, React Three Fiber, GSAP, and Tailwind CSS.",
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
