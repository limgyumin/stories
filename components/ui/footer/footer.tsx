import { Container } from "components/layout/container";

import { Contact } from "./contact";
import { ThemeSwitcher } from "../theme-switcher";

export const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex h-24 w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="text-xs font-normal text-muted-foreground">© 2024 • milimgyu • All rights reserved</p>

            <div className="hidden sm:block">
              <Contact />
            </div>
          </div>

          <ThemeSwitcher />
        </div>
      </Container>
    </footer>
  );
};
