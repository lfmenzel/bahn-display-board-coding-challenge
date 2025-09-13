import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchDepartures } from "@/api/connections.ts";
import { setDepartures } from "@/redux/board.ts";
import { formatTechnicalDateTime } from "@/components/App/helper.ts";
import { useTranslation } from "react-i18next";

export const useDepartures = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const station = useAppSelector((state) => state.board.selectedStation);

  useEffect(() => {
    if (station != null) {
      const { date, time } = formatTechnicalDateTime(new Date(), t);
      fetchDepartures(station.extId, date, time).then(({ data }) => {
        setLoading(true);
        dispatch(setDepartures(data.entries || []));
        setLoading(false);
      });
    }
  }, [station]);

  return {
    loading,
  };
};
