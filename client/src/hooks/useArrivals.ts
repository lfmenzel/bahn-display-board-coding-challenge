import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchArrivals } from "@/api/connections.ts";
import { setArrivals } from "@/redux/board.ts";
import { formatTechnicalDateTime } from "@/components/App/helper.ts";

export const useArrivals = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const station = useAppSelector((state) => state.board.selectedStation);

  useEffect(() => {
    const { date, time } = formatTechnicalDateTime(new Date(), t);
    if (station != null) {
      fetchArrivals(station.extId, date, time).then(({ data }) => {
        setLoading(true);
        dispatch(setArrivals(data.entries || []));
        setLoading(false);
      });
    }
  }, [station]);

  return {
    loading,
  };
};
