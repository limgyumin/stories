import type { Metadata } from "next";

import type { PropsWithChildren } from "react";

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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" className={pretendard.className} suppressHydrationWarning>
      <body>
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
