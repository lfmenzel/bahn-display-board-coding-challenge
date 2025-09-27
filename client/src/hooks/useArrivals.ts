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
  const { selectedStation, limit, vehicleType } = useAppSelector(
    (state) => state.board,
  );
  const { tick } = useAppSelector((state) => state.board);
  const { username, token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (selectedStation != null && selectedStation.extId != null) {
      const { date, time } = formatTechnicalDateTime(new Date(), t);
      fetchArrivals(
        selectedStation.extId,
        date,
        time,
        limit,
        vehicleType,
        username,
        token,
      ).then(({ data }) => {
        setLoading(true);
        dispatch(setArrivals(data?.entries || []));
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStation, limit, vehicleType, t, tick, token]);

  return {
    loading,
  };
};
