import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchDepartures } from "@/api/events.ts";
import { setDepartures } from "@/redux/board.ts";

export const useDepartures = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const station = useAppSelector((state) => state.board.selectedStation);

  useEffect(() => {
    if (station != null) {
      fetchDepartures(station.extId, "2025-09-13", "10:15:58").then(
        ({ data }) => {
          setLoading(true);
          dispatch(setDepartures(data.entries || []));
          setLoading(false);
        },
      );
    }
  }, [station]);

  return {
    loading,
  };
};
