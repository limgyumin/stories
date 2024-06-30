import { ThemeProvider } from "next-themes";

import type { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider enableSystem defaultTheme="system" attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};
