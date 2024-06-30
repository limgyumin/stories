import Link from "next/link";

import { Container } from "components/layout/container";

import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="bg-background/90 sticky top-0 z-10 border-b backdrop-blur-sm">
      <Container>
        <header className="flex h-[40px] w-full items-center justify-between">
          <Link href="/" className="text-foreground">
            <Logo />
          </Link>
        </header>
      </Container>
    </header>
  );
};
