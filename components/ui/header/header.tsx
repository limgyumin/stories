import Link from "next/link";

import { Container } from "components/layout/container";

import { Logo } from "./logo";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-10 w-full items-center justify-between">
          <Link href="/" className="text-foreground" title="Go to the home page" aria-label="Go to the home page">
            <Logo />
          </Link>
        </div>
      </Container>
    </header>
  );
};
