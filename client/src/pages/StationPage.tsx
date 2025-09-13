import { Legal } from "@/components/App";
import { SearchBar } from "@/components/Searchbar";
import { useStations } from "@/hooks/useStations.ts";

export const StationPage = () => {
  useStations();

  return (
    <div className="min-h-screen max-h-screen w-full h-full">
      <SearchBar />
      <Legal />
    </div>
  );
};
