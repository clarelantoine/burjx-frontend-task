import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/shared/Header";
import Provider from "@/components/shared/Provider";

// load local lufga fonts
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

// app metadata
export const metadata: Metadata = {
  title: "BurjX Frontend Assessment",
  description: "A crypto currency price tracker dashboard",
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
        <main className="m-auto max-w-[1440px] px-12.5 pt-10 pb-15 max-sm:px-3">
          {/* reactquery provider */}
          <Provider>
            <Header />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
}
