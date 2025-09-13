import { Switcher } from "@/components/App";
import { FC } from "react";

export interface LanguageSwitcherProps {
  languages: string[];
  language: string;
  setLanguage: (selected: string) => void;
  className?: string;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  language,
  setLanguage,
  languages,
  className,
}) => {
  return (
    <Switcher
      options={languages}
      selected={language}
      onChange={(language) => setLanguage(language)}
      className={className}
    />
  );
};
