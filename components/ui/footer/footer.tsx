import { Contact } from "./contact";

export const Footer = () => {
  return (
    <footer className="flex h-20 w-full items-center justify-center gap-6">
      <p className="text-xs font-normal text-gray-500">© 2024 • milimgyu • All rights reserved</p>
      <Contact />
    </footer>
  );
};
