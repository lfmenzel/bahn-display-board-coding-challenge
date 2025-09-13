import { Legal } from "@/components/App";
import { SearchBar } from "@/components/Searchbar";
import { useStations } from "@/hooks/useStations.ts";
import { BoardSM } from "@/components/Board";

export const StationPage = () => {
  useStations();

  return (
    <div className="min-h-screen max-h-screen w-full h-full">
      <SearchBar />
      <BoardSM />
      <Legal />
    </div>
  );
};
