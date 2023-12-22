import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const monstserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Registrasi",
  description: "Halaman registrasi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monstserrat.className}>{children}</body>
    </html>
  );
}
