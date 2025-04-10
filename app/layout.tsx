import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const lufgaLight = localFont({
  src: "../public/assets/fonts/LufgaLight.woff2",
  display: "swap",
  variable: "--font-lufgaLight",
});
const lufgaRegular = localFont({
  src: "../public/assets/fonts/LufgaRegular.woff2",
  display: "swap",
  variable: "--font-lufgaRegular",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lufgaLight.variable} ${lufgaRegular.variable} font-normal antialiased`}
      >
        <main className="m-auto max-w-[1440px] px-12.5 py-10">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
