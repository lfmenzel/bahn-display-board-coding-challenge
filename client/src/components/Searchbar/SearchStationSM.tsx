import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Switcher } from "@/components/App";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setLimit } from "@/redux/board.ts";

export const SearchStationSM: FC = () => {
  const { t } = useTranslation();

  const limits: string[] = ["5", "15", "30", "60", "120"];
  const dispatch = useAppDispatch();
  const { limit } = useAppSelector((state) => state.board);

  return (
    <Switcher
      options={limits}
      label={t("search.limit")}
      unit={t("search.unit")}
      selected={limit}
      onChange={(time: string) => dispatch(setLimit(time))}
      className="w-[4.5rem]"
    />
  );
};
