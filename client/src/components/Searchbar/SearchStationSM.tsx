import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Switcher } from "@/components/App";
import { useAppDispatch, useAppSelector } from "@/redux";
import { queryStations, setLimit, setSelectedStation } from "@/redux/board.ts";
import { Input } from "@/components/ui/input.tsx";

export const SearchStationSM: FC = () => {
  const { t } = useTranslation();

  const limits: string[] = ["5", "15", "30", "60", "120"];
  const dispatch = useAppDispatch();
  const { query, limit } = useAppSelector((state) => state.board);

  const handleStationChange = (e: { target: { value: string } }) => {
    dispatch(queryStations(e.target.value));
    dispatch(setSelectedStation(undefined));
  };

  return (
    <>
      <Input
        type="text"
        className="bg-background shadow-md"
        placeholder={t("search.station.placeholder")}
        value={query}
        name="station"
        onChange={handleStationChange}
      />

      <Switcher
        options={limits}
        label={t("search.limit")}
        unit={t("search.unit")}
        selected={limit}
        onChange={(time: string) => dispatch(setLimit(time))}
        className="w-[4.5rem]"
      />
    </>
  );
};
