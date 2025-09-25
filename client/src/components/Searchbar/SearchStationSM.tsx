import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Switcher } from "@/components/App";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  clearStations,
  queryStations,
  setLimit,
  setSelectedStation,
} from "@/redux/board.ts";
import {
  Option,
  SearchAndSelect,
} from "@/components/Searchbar/SearchAndSelect.tsx";
import { setOptionsForStation } from "@/components/App/helper.ts";
import { Station } from "@/api/stations.ts";

export const SearchStationSM: FC = () => {
  const { t } = useTranslation();

  const limits: string[] = ["5", "15", "30", "45", "60"];
  const dispatch = useAppDispatch();
  const { limit, stations } = useAppSelector((state) => state.board);

  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option | undefined>(undefined);

  useEffect(() => {
    if (stations?.length > 0) {
      setOptions(
        stations
          .filter((station: Station) => station.extId != undefined)
          .map((station) => setOptionsForStation(station)),
      );
    }
  }, [stations]);

  useEffect(() => {
    stations.forEach((station) => {
      if (station.extId == selected?.value) {
        dispatch(setSelectedStation(station));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations, selected, options]);

  return (
    <>
      {options && (
        <SearchAndSelect
          options={options}
          emptyMessage={t("search.station.emptyMessage")}
          placeholder={t("search.station.placeholder")}
          onValueChange={(selected) => {
            setSelected(selected);
          }}
          onSearch={(value) => dispatch(queryStations(value))}
          onClear={() => dispatch(clearStations())}
          value={selected}
          debounceTime={500}
        />
      )}

      <Switcher
        options={limits}
        label={t("search.limit")}
        unit={t("search.unit")}
        selected={limit}
        onChange={(time: string) => dispatch(setLimit(time))}
        className="w-17"
      />
    </>
  );
};
