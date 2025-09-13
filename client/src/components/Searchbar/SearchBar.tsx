import { type FC } from "react";

import { SearchStationSM } from "@/components/Searchbar/SearchStationSM.tsx";
import { Configure } from "@/components/App/Configure.tsx";

export const SearchBar: FC = () => {
  return (
    <div>
      <div className="flex flex-row w-full gap-1 sticky top-0 z-10">
        <SearchStationSM />
        <div className="hidden xs:flex xs:hflex-row gap-1">
          <Configure />
        </div>
      </div>
    </div>
  );
};
