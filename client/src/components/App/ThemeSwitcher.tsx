import { FC } from "react";
import { Moon, Sun, Computer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeMode } from "@/components/App/ThemeProvider";
import { cn } from "@/components/App/helper.ts";

export interface ThemeSwitcherProps {
  themeModes: string[];
  themeMode: string;
  setThemeMode: (selected: string) => void;
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  themeModes,
  themeMode,
  setThemeMode,
  className,
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "border border-input bg-background text-accent-foreground hover:bg-accent hover:text-accent-foreground shadow-md",
        className,
      )}
      onClick={() => {
        const newThemeModeIndex: number =
          themeModes.indexOf(themeMode as ThemeMode) + 1;
        if (newThemeModeIndex >= themeModes.length) {
          setThemeMode(themeModes[0]);
        } else {
          setThemeMode(themeModes[newThemeModeIndex]);
        }
      }}
    >
      {themeMode === "system" && (
        <Computer className="h-[1.2rem] w-[1.2rem] text-foreground" />
      )}
      {themeMode === "dark" && (
        <Moon className="h-[1.2rem] w-[1.2rem] text-foreground" />
      )}
      {themeMode === "light" && (
        <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
      )}
    </Button>
  );
};
