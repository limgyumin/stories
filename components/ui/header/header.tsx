import Link from "next/link";

import { Container } from "components/layout/container";

import { Logo } from "./logo";

export const Header = () => {
  return (
    <div className="sticky top-0 z-10 border-b border-gray-100 bg-[rgba(255,255,255,.9)] backdrop-blur-sm">
      <Container>
        <header className="flex h-[40px] w-full items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
        </header>
      </Container>
    </div>
  );
};
