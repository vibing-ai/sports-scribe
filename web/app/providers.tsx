"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "../components/ui/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </HeroUIProvider>
  );
}
