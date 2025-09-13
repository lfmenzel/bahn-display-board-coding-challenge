import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchStations } from "@/api/stations.ts";
import { setSelectedStation, setStations } from "@/redux/board.ts";

export const useStations = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { query, limit } = useAppSelector((state) => state.board);

  useEffect(() => {
    if (query != null && query != "" && limit != null) {
      fetchStations(query, limit).then(({ data }) => {
        setLoading(true);
        dispatch(setStations(data));
        setLoading(false);
      });
    } else {
      dispatch(setStations([]));
      dispatch(setSelectedStation(undefined));
    }
  }, [query, limit]);

  return {
    loading,
  };
};
