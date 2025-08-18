import type { Theme } from "@/types";

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

