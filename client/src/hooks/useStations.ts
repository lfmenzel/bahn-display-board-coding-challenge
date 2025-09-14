import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux";
import { fetchStations } from "@/api/stations.ts";
import { setStations } from "@/redux/board.ts";

export const useStations = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { query } = useAppSelector((state) => state.board);

  useEffect(() => {
    if (query != null && query != "") {
      fetchStations(query, "25").then(({ data }) => {
        setLoading(true);
        dispatch(setStations(data));
        setLoading(false);
      });
    } else {
      dispatch(setStations([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return {
    loading,
  };
};
