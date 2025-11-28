import { create } from "zustand";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  setTheme: (theme: Theme) => {
    set((state) => ({ ...state, theme }));
  },
}));

export default useThemeStore;
