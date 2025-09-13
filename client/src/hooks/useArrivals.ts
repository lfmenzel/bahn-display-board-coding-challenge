import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchArrivals } from "@/api/events.ts";
import { setArrivals } from "@/redux/board.ts";

export const useArrivals = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const station = useAppSelector((state) => state.board.selectedStation);

  useEffect(() => {
    if (station != null) {
      fetchArrivals(station.extId, "2025-09-13", "10:15:58").then(
        ({ data }) => {
          setLoading(true);
          dispatch(setArrivals(data.entries || []));
          setLoading(false);
        },
      );
    }
  }, [station]);

  return {
    loading,
  };
};
