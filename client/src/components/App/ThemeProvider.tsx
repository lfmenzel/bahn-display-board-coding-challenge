import { FC, ReactNode } from "react";

import { useAppSelector } from "@/redux";

export type ThemeMode = "system" | "dark" | "light";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { themeMode } = useAppSelector((state) => state.app);
  const mode =
    themeMode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : themeMode;

  document.getElementById("body")?.setAttribute("data-theme", `${mode}`);
  document.getElementById("body")?.classList.remove("dark", "light");
  document.getElementById("body")?.classList.add(mode);

  return (
    <div className={mode} data-theme={`${mode}`}>
      {children}
    </div>
  );
};
