import { type FC } from "react";

import { useAppDispatch, useAppSelector } from "@/redux";
import { SearchStationSM } from "@/components/Searchbar/SearchStationSM.tsx";
import { Station } from "@/api/stations.ts";
import { clearQuery, setSelectedStation } from "@/redux/board.ts";
import { Button } from "@/components/ui/button.tsx";
import { Configure } from "@/components/App/Configure.tsx";

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();

  const { query, stations, selectedStation } = useAppSelector(
    (state) => state.board,
  );

  return (
    <div>
      <div className="flex flex-row w-full gap-1 sticky top-0">
        <SearchStationSM />
        <div className="hidden xs:flex xs:hflex-row gap-1">
          <Configure />
        </div>
      </div>
      {/*TODO Show Result of useStation*/}
      <div className="text-foreground text-lg mt-4">
        {query && (
          <Button variant="ghost" onClick={() => dispatch(clearQuery())}>
            Clear search
          </Button>
        )}
        {stations && !selectedStation && (
          <div>
            {stations.map((station: Station) => (
              <div
                className="text-foreground text-xs"
                key={station.id}
                onClick={() => {
                  dispatch(setSelectedStation(station));
                }}
              >
                {station.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
