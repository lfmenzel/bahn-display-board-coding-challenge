import { type FC } from "react";

import { LanguageSwitcher, ThemeSwitcher } from "@/components/App";
import { setLanguage, setThemeMode } from "@/redux/app.ts";
import { useAppDispatch, useAppSelector } from "@/redux";
import { SearchStationSM } from "@/components/Searchbar/SearchStationSM.tsx";
import { Station } from "@/api/stations.ts";

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const themeMode: string = useAppSelector((state) => state.app.themeMode);
  const themeModes = ["system", "dark", "light"];
  const language = useAppSelector((state) => state.app.language);
  const languages: string[] = ["de", "en"];

  const { stations } = useAppSelector((state) => state.board);

  return (
    <div>
      <div className="flex flex-row w-full gap-1 sticky top-0">
        <SearchStationSM />

        <LanguageSwitcher
          language={language}
          setLanguage={(language: string) => dispatch(setLanguage(language))}
          languages={languages}
          className="hidden xs:block"
        />

        <ThemeSwitcher
          themeMode={themeMode}
          setThemeMode={(themeMode: string) =>
            dispatch(setThemeMode(themeMode))
          }
          themeModes={themeModes}
          className="hidden xs:block"
        />
      </div>
      {/*TODO Show Result of useStation*/}
      <div className="text-foreground text-2xl mt-4">
        {stations && (
          <div>
            {stations[0]?.name || " "}
            {stations.map((station: Station) => (
              <div className="text-foreground text-xs" key={station.id}>
                {station.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
