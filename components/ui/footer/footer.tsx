import { Contact } from "./contact";

export const Footer = () => {
  return (
    <footer className="flex h-20 w-full items-center justify-center gap-6">
      <p className="text-muted-foreground text-xs font-normal">© 2024 • milimgyu • All rights reserved</p>
      <Contact />
    </footer>
  );
};
