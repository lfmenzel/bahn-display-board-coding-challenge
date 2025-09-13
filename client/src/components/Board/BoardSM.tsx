import { type FC } from "react";

import { Board } from "@/components/Board";
import { useAppSelector } from "@/redux";

export const BoardSM: FC = () => {
  const station = useAppSelector((state) => state.board.selectedStation);

  return (
    station && (
      <div>
        {station && (
          <div className="text-foreground text-2xl my-4">{station.name}</div>
        )}
        <div className="grid grid-flow-row gap-2 grid-cols-1 sm:grid-cols-2 w-full mt-4">
          <Board label="departures" />
          <Board label="arrivals" />
        </div>
      </div>
    )
  );
};
