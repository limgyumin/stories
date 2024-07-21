import type { Metadata } from "next";

import type { PropsWithChildren } from "react";

import { Footer } from "components/ui/footer";
import { Header } from "components/ui/header";
import { pretendard } from "libs/next/font";

import "styles/global.css";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s - Nonamed",
    default: "Nonamed",
  },
  description: "The nonamed stories of a frontend engineer.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nonamed",
    description: "The nonamed stories of a frontend engineer.",
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
  twitter: {
    title: "Nonamed",
    description: "The nonamed stories of a frontend engineer.",
    card: "summary_large_image",
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko" className={pretendard.className} suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <Header />
          <main className="w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
