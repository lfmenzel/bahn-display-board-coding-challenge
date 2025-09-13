import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchArrivals } from "@/api/connections.ts";
import { setArrivals } from "@/redux/board.ts";
import {
  filterDates,
  formatTechnicalDateTime,
} from "@/components/App/helper.ts";

export const useArrivals = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { selectedStation, limit } = useAppSelector((state) => state.board);

  useEffect(() => {
    if (selectedStation != null && selectedStation.extId != null) {
      const { date, time } = formatTechnicalDateTime(new Date(), t);
      fetchArrivals(selectedStation.extId, date, time).then(({ data }) => {
        const connections = (data.entries || []).filter(
          (entry: { zeit: string; ezZeit: string }) => {
            return filterDates(entry.zeit, entry.ezZeit, limit);
          },
        );
        setLoading(true);
        dispatch(setArrivals(connections));
        setLoading(false);
      });
    }
  }, [selectedStation, limit]);

  return {
    loading,
  };
};
