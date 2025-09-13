import { Legal } from "@/components/App";
import { SearchBar } from "@/components/Searchbar";

export const StationPage = () => {
  return (
    <div className="min-h-screen max-h-screen w-full h-full">
      <SearchBar />
      <Legal />
    </div>
  );
};
