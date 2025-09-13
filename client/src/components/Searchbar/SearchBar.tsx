import { type FC, useState } from "react";

import { SearchStationSM } from "@/components/Searchbar/SearchStationSM.tsx";
import { Configure } from "@/components/App/Configure.tsx";
import { Switcher } from "@/components/App";
import { setVehicleType } from "@/redux/board.ts";
import { useAppDispatch, useAppSelector } from "@/redux";

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const { vehicleType } = useAppSelector((state) => state.board);

  const vehicles: string[] = ["T", "L", "A"];
  const [vehicle, setVehicle] = useState(vehicleType);

  return (
    <div>
      <div className="flex flex-row w-full gap-1 sticky top-0 z-10">
        <SearchStationSM />

        <Switcher
          options={vehicles}
          selected={vehicle}
          onChange={(vehicleType) => {
            setVehicle(vehicleType);
            dispatch(setVehicleType(vehicleType));
          }}
        />

        <div className="hidden xs:flex xs:hflex-row gap-1">
          <Configure />
        </div>
      </div>
    </div>
  );
};
