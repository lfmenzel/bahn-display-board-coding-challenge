import { Footer } from "@/components/App";
import { SearchBar } from "@/components/Searchbar";
import { useStations } from "@/hooks/useStations.ts";
import { BoardSM } from "@/components/Board";
import { useDepartures } from "@/hooks/useDepartures.ts";
import { useArrivals } from "@/hooks/useArrivals.ts";

export const StationPage = () => {
  useStations();
  useDepartures();
  useArrivals();

  return (
    <div className="min-h-screen max-h-screen w-full h-full">
      <SearchBar />
      <BoardSM />
      <Footer />
    </div>
  );
};
