import { type FC, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

import { SearchStationSM } from "@/components/Searchbar/SearchStationSM.tsx";
import { Configure } from "@/components/App/Configure.tsx";
import { Switcher } from "@/components/App";
import { setVehicleType, setRefreshInterval } from "@/redux/board.ts";
import { useAppDispatch, useAppSelector } from "@/redux";
import { Button } from "@/components/ui/button.tsx";

export const SearchBarSM: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { vehicleType, refreshInterval } = useAppSelector(
    (state) => state.board,
  );

  const vehicles: string[] = ["Trains", "Local", "Ships", "All"];
  const [vehicle, setVehicle] = useState(vehicleType);

  const refreshTimes: string[] = ["-", "1", "5", "15"];
  const [refresh, setRefresh] = useState(refreshInterval);

  return (
    <div>
      <div className="flex flex-row w-full gap-1 sticky top-0 z-10 pb-4">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="w-10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <SearchStationSM />

        <Switcher
          options={vehicles}
          selected={vehicle}
          onChange={(vehicleType) => {
            setVehicle(vehicleType);
            dispatch(setVehicleType(vehicleType));
          }}
          className="w-12"
        />

        <Switcher
          options={refreshTimes}
          selected={refresh}
          onChange={(refreshTime) => {
            setRefresh(refreshTime);
            dispatch(setRefreshInterval(refreshTime));
          }}
        />

        <div className="hidden xs:flex xs:hflex-row gap-1">
          <Configure />
        </div>
      </div>
    </div>
  );
};
