"use client";

import { useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HeroUIProvider>
      {mounted ? (
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="sport-scribe-theme"
        >
          {children}
        </NextThemesProvider>
      ) : (
        <div suppressHydrationWarning>{children}</div>
      )}
    </HeroUIProvider>
  );
}
