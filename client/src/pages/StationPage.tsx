import { SearchBarSM } from "@/components/Searchbar";
import { useStations } from "@/hooks/useStations.ts";
import { BoardSM } from "@/components/Board";
import { useDepartures } from "@/hooks/useDepartures.ts";
import { useArrivals } from "@/hooks/useArrivals.ts";
import { useAppSelector } from "@/redux";

export const StationPage = () => {
  const { username, token } = useAppSelector((state) => state.user);
  const isLocal = import.meta.env.VITE_IS_LOCAL || 3000;

  useStations();
  useDepartures();
  useArrivals();

  return (
    <div className="min-h-screen max-h-screen w-full h-full">
      <SearchBarSM />
      {((username && token) || isLocal) && <BoardSM />}
    </div>
  );
};
