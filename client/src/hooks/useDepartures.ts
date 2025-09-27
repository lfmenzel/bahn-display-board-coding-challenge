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
  const { selectedStation, limit, vehicleType } = useAppSelector(
    (state) => state.board,
  );
  const { tick } = useAppSelector((state) => state.board);
  const { username, token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (selectedStation != null && selectedStation.extId != null) {
      const { date, time } = formatTechnicalDateTime(new Date(), t);
      fetchDepartures(
        selectedStation.extId,
        date,
        time,
        limit,
        vehicleType,
        username,
        token,
      ).then(({ data }) => {
        setLoading(true);
        dispatch(setDepartures(data?.entries || []));
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStation, limit, vehicleType, t, tick]);

  return {
    loading,
  };
};
