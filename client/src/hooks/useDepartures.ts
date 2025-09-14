import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchDepartures } from "@/api/connections.ts";
import { setDepartures } from "@/redux/board.ts";
import {
  filterDates,
  formatTechnicalDateTime,
} from "@/components/App/helper.ts";
import { useTranslation } from "react-i18next";

export const useDepartures = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { selectedStation, limit, vehicleType } = useAppSelector(
    (state) => state.board,
  );

  useEffect(() => {
    if (selectedStation != null && selectedStation.extId != null) {
      const { date, time } = formatTechnicalDateTime(new Date(), t);
      fetchDepartures(selectedStation.extId, date, time, vehicleType).then(
        ({ data }) => {
          const entries = data?.entries || [];
          const connections = entries.filter(
            (entry: { zeit: string; ezZeit: string }) => {
              return filterDates(entry.zeit, entry.ezZeit, limit);
            },
          );
          setLoading(true);
          dispatch(setDepartures(connections));
          setLoading(false);
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStation, limit, vehicleType, t]);

  return {
    loading,
  };
};
