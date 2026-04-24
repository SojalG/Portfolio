import "./globals.css";

export const metadata = {
  title: "Neon Tunnel",
  description: "Scroll-driven shader tunnel built with Next.js and React Three Fiber.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
