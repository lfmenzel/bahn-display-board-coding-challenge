import { type FC } from "react";
import { LanguageSwitcher } from "@/components/App/LanguageSwitcher.tsx";
import { setLanguage, setThemeMode } from "@/redux/app.ts";
import { ThemeSwitcher } from "@/components/App/ThemeSwitcher.tsx";
import { useAppDispatch, useAppSelector } from "@/redux";

export const Configure: FC = () => {
  const dispatch = useAppDispatch();
  const themeMode: string = useAppSelector((state) => state.app.themeMode);
  const themeModes = ["system", "dark", "light"];
  const language = useAppSelector((state) => state.app.language);
  const languages: string[] = ["de", "en"];

  return (
    <>
      <LanguageSwitcher
        language={language}
        setLanguage={(language: string) => dispatch(setLanguage(language))}
        languages={languages}
      />

      <ThemeSwitcher
        themeMode={themeMode}
        setThemeMode={(themeMode: string) => dispatch(setThemeMode(themeMode))}
        themeModes={themeModes}
      />
    </>
  );
};
