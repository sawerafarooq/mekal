import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mekal Invest — Stock Picking for Classrooms",
  description:
    "A safe, fun stock-picking competition for classrooms and kids 8-12. No real money, just real learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Fredoka:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-baloo antialiased">{children}</body>
    </html>
  );
}
