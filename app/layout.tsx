import type { Metadata } from "next";

import type { PropsWithChildren } from "react";

import { Footer } from "components/ui/footer";
import { Header } from "components/ui/header";
import { pretendard } from "libs/next/font";

import "styles/global.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Nonamed",
    default: "Nonamed",
  },
  alternates: {
    canonical: "/",
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko" className={pretendard.className} suppressHydrationWarning>
      <body className="min-h-screen w-full">
        <Header />
        <main className="w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
